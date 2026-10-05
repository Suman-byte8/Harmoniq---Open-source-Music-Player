const { test } = require("node:test");
const assert = require("node:assert/strict");

process.env.MAX_CONCURRENT_PROCESSES = "2";
process.env.MAX_QUEUED_PROCESSES = "1";
const { run, exec } = require("../src/utils/run");

test("process pool: caps concurrency, queues, then rejects with 503", async () => {
  let running = 0;
  let peak = 0;
  exec.execFile = (f, a, o, cb) => {
    running++;
    peak = Math.max(peak, running);
    setTimeout(() => {
      running--;
      cb(null, "ok");
    }, 30);
  };
  const results = await Promise.allSettled([1, 2, 3, 4, 5].map(() => run("x", [])));
  const ok = results.filter((r) => r.status === "fulfilled").length;
  const busy = results.filter((r) => r.status === "rejected" && r.reason.status === 503).length;
  assert.equal(peak, 2);
  assert.equal(ok, 3); // 2 running + 1 queued
  assert.equal(busy, 2);
});
