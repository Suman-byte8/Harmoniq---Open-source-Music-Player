const { test } = require("node:test");
const assert = require("node:assert/strict");
const h = require("./helpers");

test("rate limiter returns JSON 429 after 100 requests; health stays exempt", async () => {
  const api = await h.start();
  let last;
  for (let i = 0; i < 101; i++) last = await api.get("/api/nope");
  assert.equal(last.status, 429);
  assert.equal(last.json.success, false);
  assert.ok(last.headers.get("ratelimit-limit") || last.headers.get("ratelimit"));
  assert.equal((await api.get("/api/health")).status, 200);
  await api.close();
});
