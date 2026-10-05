const { run, YTDLP } = require("./run");

const PYTHON = process.env.PYTHON_BIN || "python";
const TTL_MS = 60 * 1000;
let last = { at: 0, value: null };

// Readiness = the external tools we shell out to are installed and importable.
// This does not call YouTube, so it cannot be used to burn upstream quota; the
// result is memoised for 60 s so probes cannot spawn processes in a loop.
async function check() {
  const probe = async (fn) => {
    try {
      return { ok: true, detail: (await fn()).trim().split(/\r?\n/)[0] };
    } catch (err) {
      return { ok: false, detail: err.code === "ENOENT" ? "not installed" : "failed" };
    }
  };
  const [ytdlp, ytmusicapi] = await Promise.all([
    probe(() => run(YTDLP, ["--version"])),
    probe(() =>
      run(PYTHON, ["-c", "import importlib.metadata as m;print(m.version('ytmusicapi'))"]),
    ),
  ]);
  return { ready: ytdlp.ok && ytmusicapi.ok, checks: { ytdlp, ytmusicapi } };
}

async function getReadiness(now = Date.now()) {
  if (!last.value || now - last.at > TTL_MS) {
    last = { at: now, value: await check() };
  }
  return last.value;
}

function _reset() {
  last = { at: 0, value: null };
}

module.exports = { getReadiness, _reset };
