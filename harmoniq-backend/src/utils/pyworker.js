const { spawn } = require("child_process");
const readline = require("readline");

// Talks JSON-lines to a long-lived process (python/worker.py). The process is
// started lazily, restarted automatically after a crash or timeout, and every
// in-flight call is rejected if it dies, so callers never hang.
class PyWorker {
  constructor({ command, args, cwd, timeoutMs = 30000, spawnFn = spawn }) {
    Object.assign(this, { command, args, cwd, timeoutMs, spawnFn });
    this.proc = null;
    this.nextId = 1;
    this.pending = new Map();
  }

  _start() {
    const proc = this.spawnFn(this.command, this.args, {
      cwd: this.cwd,
      stdio: ["pipe", "pipe", "ignore"],
      windowsHide: true,
      env: { ...process.env, PYTHONIOENCODING: "utf-8", PYTHONUNBUFFERED: "1" },
    });
    this.proc = proc;

    readline.createInterface({ input: proc.stdout }).on("line", (line) => {
      let msg;
      try {
        msg = JSON.parse(line);
      } catch {
        return;
      }
      const p = this.pending.get(msg.id);
      if (!p) return; // late reply for a call that already timed out
      this.pending.delete(msg.id);
      clearTimeout(p.timer);
      if (msg.error !== undefined) p.reject(new Error(msg.error));
      else p.resolve(msg.result);
    });

    const died = (err) => {
      if (this.proc !== proc) return; // already detached by stop()
      this.proc = null;
      this._rejectAll(err || new Error("Python worker exited"));
    };
    proc.on("error", (err) => died(err)); // e.g. ENOENT: python missing
    proc.on("exit", () => died());
    proc.stdin.on("error", () => {}); // EPIPE is handled by the exit event
    return proc;
  }

  call(cmd, args) {
    const proc = this.proc || this._start();
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        const err = new Error("Python worker timed out");
        err.killed = true;
        err.status = 504;
        reject(err);
        // A hung worker would stay hung: recycle it (other callers get an error and retry).
        this.stop();
      }, this.timeoutMs);
      this.pending.set(id, { resolve, reject, timer });
      proc.stdin.write(JSON.stringify({ id, cmd, args }) + "\n");
    });
  }

  _rejectAll(err) {
    for (const [id, p] of this.pending) {
      clearTimeout(p.timer);
      p.reject(err);
      this.pending.delete(id);
    }
  }

  // Detach immediately so the next call() starts a fresh process rather than
  // writing to one that is shutting down.
  stop() {
    const proc = this.proc;
    if (!proc) return;
    this.proc = null;
    this._rejectAll(new Error("Python worker stopped"));
    proc.kill();
  }
}

module.exports = PyWorker;
