// Test harness: boots the real Express app on an ephemeral port and replaces the
// child-process layer (python / yt-dlp) with a programmable stub, so tests need no
// network, Python, or yt-dlp.
process.env.NODE_ENV = "test";
process.env.PYTHON_WORKER = "false"; // API tests stub execFile; the worker has its own tests
const { exec } = require("../src/utils/run");
const app = require("../src/app");
const cache = require("../src/config/cache");

const calls = [];
let handler = () => Promise.reject(new Error("no stub configured"));

exec.execFile = (file, args, opts, cb) => {
  calls.push({ file, args });
  Promise.resolve()
    .then(() => handler(file, args))
    .then((out) => cb(null, typeof out === "string" ? out : JSON.stringify(out)))
    .catch((err) => cb(err));
};

function start() {
  return new Promise((resolve) => {
    const server = app.listen(0, () => {
      const base = `http://127.0.0.1:${server.address().port}`;
      resolve({
        base,
        close: () => new Promise((r) => { server.close(r); server.closeAllConnections?.(); }),
        get: async (path, init) => {
          const res = await fetch(base + path, init);
          const text = await res.text();
          let json = null;
          try {
            json = JSON.parse(text);
          } catch {
            /* not JSON */
          }
          return { status: res.status, headers: res.headers, text, json };
        },
      });
    });
  });
}

module.exports = {
  start,
  calls,
  stub: (fn) => {
    handler = fn;
  },
  reset: () => {
    calls.length = 0;
    cache.flushAll();
  },
};
