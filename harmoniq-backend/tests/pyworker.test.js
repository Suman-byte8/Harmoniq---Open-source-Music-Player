const { test, describe } = require("node:test");
const assert = require("node:assert/strict");
const path = require("path");
const PyWorker = require("../src/utils/pyworker");

// A tiny stand-in worker speaking the same JSON-lines protocol, so the client logic
// (ids, errors, crash recovery, timeouts) is tested without Python or the network.
const FAKE = path.join(__dirname, "fake-worker.js");
const make = (timeoutMs = 2000) =>
  new PyWorker({ command: process.execPath, args: [FAKE], timeoutMs });

describe("PyWorker", () => {
  test("resolves results and matches concurrent replies by id", async () => {
    const w = make();
    const out = await Promise.all([
      w.call("echo", ["a", 60]),
      w.call("echo", ["b", 10]),
      w.call("echo", ["c", 30]),
    ]);
    assert.deepEqual(out, ["a", "b", "c"]);
    w.stop();
  });
  test("worker-reported error rejects only that call", async () => {
    const w = make();
    const [ok, bad] = await Promise.allSettled([w.call("echo", ["x", 0]), w.call("fail", [])]);
    assert.equal(ok.status, "fulfilled");
    assert.equal(bad.status, "rejected");
    assert.match(bad.reason.message, /boom/);
    w.stop();
  });
  test("crash rejects in-flight calls and the next call restarts the worker", async () => {
    const w = make();
    await assert.rejects(w.call("crash", []));
    assert.equal(await w.call("echo", ["again", 0]), "again");
    w.stop();
  });
  test("timeout rejects with 504 and recycles the worker", async () => {
    const w = make(100);
    await assert.rejects(w.call("echo", ["slow", 1000]), (e) => e.status === 504);
    assert.equal(await w.call("echo", ["fast", 0]), "fast");
    w.stop();
  });
  test("missing executable rejects instead of hanging", async () => {
    const w = new PyWorker({ command: "definitely-not-a-binary", args: [], timeoutMs: 2000 });
    await assert.rejects(w.call("echo", ["x", 0]), (e) => e.code === "ENOENT");
  });
});
