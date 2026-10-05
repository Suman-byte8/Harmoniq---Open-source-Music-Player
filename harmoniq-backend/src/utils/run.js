const { execFile } = require("child_process");

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

async function runPythonJson(script, args) {
  const stdout = await run(PYTHON, [script, ...args]);
  try {
    return JSON.parse(stdout.trim());
  } catch {
    throw new Error("Upstream script returned invalid JSON");
  }
}

module.exports = { run, runPythonJson, exec, YTDLP, BusyError };
