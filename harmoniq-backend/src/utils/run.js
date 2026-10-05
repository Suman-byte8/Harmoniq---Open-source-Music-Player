const path = require("path");
const { execFile } = require("child_process");
const PyWorker = require("./pyworker");

// Every metadata/stream lookup spawns a process. Bound how many run at once and
// how long each may take so a burst of requests cannot exhaust the host.
const MAX_CONCURRENT = Number(process.env.MAX_CONCURRENT_PROCESSES) || 4;
const MAX_QUEUE = Number(process.env.MAX_QUEUED_PROCESSES) || 50;
const TIMEOUT_MS = Number(process.env.PROCESS_TIMEOUT_MS) || 30000;
const PYTHON = process.env.PYTHON_BIN || "python";
const YTDLP = process.env.YTDLP_BIN || "yt-dlp";

class BusyError extends Error {
  constructor() {
    super("Server is busy, try again shortly");
    this.status = 503;
    this.expose = true;
  }
}

let active = 0;
const waiting = [];

function release() {
  active--;
  const next = waiting.shift();
  if (next) next();
}

function acquire() {
  if (active < MAX_CONCURRENT) {
    active++;
    return Promise.resolve();
  }
  if (waiting.length >= MAX_QUEUE) return Promise.reject(new BusyError());
  return new Promise((resolve) =>
    waiting.push(() => {
      active++;
      resolve();
    }),
  );
}

// Exposed as an object so tests can stub `exec.execFile`.
const exec = { execFile };

async function run(file, args, opts = {}) {
  await acquire();
  try {
    return await new Promise((resolve, reject) => {
      exec.execFile(
        file,
        args,
        { maxBuffer: 5 * 1024 * 1024, timeout: TIMEOUT_MS, windowsHide: true, ...opts },
        (err, stdout) => {
          if (!err) return resolve(stdout);
          if (err.killed) err.status = 504;
          reject(err);
        },
      );
    });
  } finally {
    release();
  }
}

const PY_DIR = path.join(__dirname, "../../python");
const SCRIPTS = {
  search: "search_music.py",
  trending: "trending.py",
  artist: "artist.py",
  album: "album.py",
};

// PYTHON_WORKER=false falls back to one process per call (slower, but simplest to debug).
const USE_WORKER = process.env.PYTHON_WORKER !== "false";
let worker = null;
function getWorker() {
  if (!worker) {
    worker = new PyWorker({
      command: PYTHON,
      args: ["-u", path.join(PY_DIR, "worker.py")],
      cwd: PY_DIR,
      timeoutMs: TIMEOUT_MS,
    });
  }
  return worker;
}

// cmd: search | trending | artist | album. Result is parsed JSON.
async function runPythonJson(cmd, args) {
  if (!USE_WORKER) {
    const stdout = await run(PYTHON, [path.join(PY_DIR, SCRIPTS[cmd]), ...args]);
    try {
      return JSON.parse(stdout.trim());
    } catch {
      throw new Error("Upstream script returned invalid JSON");
    }
  }
  await acquire();
  try {
    return await getWorker().call(cmd, args);
  } finally {
    release();
  }
}

function stopWorker() {
  if (worker) worker.stop();
}

module.exports = { run, runPythonJson, stopWorker, exec, YTDLP, BusyError };
