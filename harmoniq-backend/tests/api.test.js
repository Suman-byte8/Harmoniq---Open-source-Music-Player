const { test, describe, before, after, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const h = require("./helpers");
const cache = require("../src/config/cache");

const SONG = { videoId: "dQw4w9WgXcQ", title: "T", artist: "A", duration: 10 };
const STREAM =
  "https://rr2.googlevideo.com/videoplayback?expire=" +
  (Math.floor(Date.now() / 1000) + 21000) +
  "&id=x";

let api;
before(async () => {
  api = await h.start();
});
after(() => api.close());
beforeEach(() => {
  h.reset();
  h.stub(() => Promise.reject(new Error("unexpected spawn")));
});

describe("GET /api/health", () => {
  test("returns ok without spawning processes", async () => {
    const r = await api.get("/api/health");
    assert.equal(r.status, 200);
    assert.equal(r.json.status, "ok");
    assert.equal(h.calls.length, 0);
  });
  test("sets security headers", async () => {
    const r = await api.get("/api/health");
    assert.ok(r.headers.get("content-security-policy"));
    assert.equal(r.headers.get("x-powered-by"), null);
  });
});

describe("GET /api/search", () => {
  test("200 and caches second call (query normalised)", async () => {
    h.stub(() => [SONG]);
    const a = await api.get("/api/search?q=Coldplay");
    const b = await api.get("/api/search?q=%20coldplay%20");
    assert.equal(a.status, 200);
    assert.equal(a.json.cached, false);
    assert.equal(b.json.cached, true);
    assert.equal(h.calls.length, 1);
  });
  test("400 when q missing / empty / whitespace", async () => {
    for (const p of ["/api/search", "/api/search?q=", "/api/search?q=%20%20"]) {
      assert.equal((await api.get(p)).status, 400, p);
    }
  });
  test("regression: repeated or object q is 400, not 500", async () => {
    assert.equal((await api.get("/api/search?q=a&q=b")).status, 400);
    assert.equal((await api.get("/api/search?q[x]=1")).status, 400);
  });
  test("400 when q exceeds length limit", async () => {
    assert.equal((await api.get("/api/search?q=" + "a".repeat(201))).status, 400);
  });
  test("treats leading-dash and shell metacharacters as plain data", async () => {
    h.stub(() => []);
    const q = "--help; rm -rf / & `id`";
    const r = await api.get("/api/search?q=" + encodeURIComponent(q));
    assert.equal(r.status, 200);
    assert.equal(h.calls[0].args[1], q.toLowerCase());
  });
  test("502 (no internals) when upstream fails", async () => {
    h.stub(() => Promise.reject(new Error("ytmusicapi traceback C:\\secret\\path")));
    const r = await api.get("/api/search?q=x");
    assert.equal(r.status, 502);
    assert.ok(!r.text.includes("secret"));
  });
  test("502 on invalid JSON from script", async () => {
    h.stub(() => "Traceback...");
    assert.equal((await api.get("/api/search?q=x")).status, 502);
  });
  test("failures are not cached", async () => {
    h.stub(() => Promise.reject(new Error("boom")));
    await api.get("/api/search?q=retry");
    h.stub(() => [SONG]);
    assert.equal((await api.get("/api/search?q=retry")).status, 200);
  });
  test("concurrent identical requests share one upstream call", async () => {
    h.stub(() => new Promise((r) => setTimeout(() => r([SONG]), 50)));
    const rs = await Promise.all([1, 2, 3, 4, 5].map(() => api.get("/api/search?q=same")));
    assert.ok(rs.every((r) => r.status === 200));
    assert.equal(h.calls.length, 1);
  });
  test("regression: cache full does not turn into a 500", async () => {
    for (let i = 0; i < 5000; i++) cache.set("filler" + i, 1);
    h.stub(() => [SONG]);
    const r = await api.get("/api/search?q=full");
    assert.equal(r.status, 200);
  });
});

describe("GET /api/trending", () => {
  test("200 then cached", async () => {
    h.stub(() => [SONG]);
    assert.equal((await api.get("/api/trending")).json.cached, false);
    assert.equal((await api.get("/api/trending")).json.cached, true);
    assert.equal(h.calls.length, 1);
  });
  test("502 on upstream failure", async () => {
    h.stub(() => Promise.reject(new Error("x")));
    assert.equal((await api.get("/api/trending")).status, 502);
  });
});

describe("GET /api/artist", () => {
  test("200 for known artist", async () => {
    h.stub(() => ({ artistId: "UC1", name: "Coldplay", topSongs: [], albums: [] }));
    const r = await api.get("/api/artist?name=Coldplay");
    assert.equal(r.status, 200);
    assert.equal(r.json.data.name, "Coldplay");
  });
  test("regression: unknown artist is 404, not 200 with {}", async () => {
    h.stub(() => ({}));
    assert.equal((await api.get("/api/artist?name=nobody")).status, 404);
  });
  test("negative result is cached briefly", async () => {
    h.stub(() => ({}));
    await api.get("/api/artist?name=nobody");
    await api.get("/api/artist?name=nobody");
    assert.equal(h.calls.length, 1);
  });
  test("400 when name missing or repeated", async () => {
    assert.equal((await api.get("/api/artist")).status, 400);
    assert.equal((await api.get("/api/artist?name=a&name=b")).status, 400);
  });
  test("script-reported error maps to 502", async () => {
    h.stub(() => ({ error: "quota" }));
    assert.equal((await api.get("/api/artist?name=x")).status, 502);
  });
});

describe("GET /api/album", () => {
  test("200 and cached", async () => {
    h.stub(() => ({ title: "P", artist: "C", tracks: [] }));
    assert.equal((await api.get("/api/album?title=P&artist=C")).status, 200);
    assert.equal((await api.get("/api/album?title=p&artist=c")).json.cached, true);
  });
  test("400 when a param is missing or an array", async () => {
    assert.equal((await api.get("/api/album?title=P")).status, 400);
    assert.equal((await api.get("/api/album?artist=C")).status, 400);
    assert.equal((await api.get("/api/album?title=a&title=b&artist=C")).status, 400);
  });
  test("cache key cannot collide across title/artist boundaries", async () => {
    h.stub((f, args) => ({ title: args[1], artist: args[2], tracks: [] }));
    await api.get("/api/album?title=a:b&artist=c");
    const r = await api.get("/api/album?title=a&artist=b:c");
    assert.equal(r.json.cached, false);
  });
  test("502 on upstream error", async () => {
    h.stub(() => ({ error: "nope" }));
    assert.equal((await api.get("/api/album?title=a&artist=b")).status, 502);
  });
});

describe("GET /api/stream/:videoId", () => {
  test("200 with url and expiresAt, cached afterwards", async () => {
    h.stub(() => STREAM + "\n");
    const a = await api.get("/api/stream/dQw4w9WgXcQ");
    assert.equal(a.status, 200);
    assert.equal(a.json.data.url, STREAM);
    assert.ok(a.json.data.expiresAt);
    assert.equal((await api.get("/api/stream/dQw4w9WgXcQ")).json.cached, true);
  });
  test("SECURITY regression: shell metacharacters in videoId are rejected with 400", async () => {
    const ids = ["x%26echo%20pwn", "x;id", "%24(id)", "abc", "..%2f..%2fetc", "a".repeat(12), "-oexec"];
    for (const id of ids) {
      const r = await api.get("/api/stream/" + id);
      assert.equal(r.status, 400, id);
    }
    assert.equal(h.calls.length, 0);
  });
  test("yt-dlp invoked without a shell, URL after '--'", async () => {
    h.stub(() => STREAM);
    await api.get("/api/stream/dQw4w9WgXcQ");
    const { file, args } = h.calls[0];
    assert.equal(file, "yt-dlp");
    assert.equal(args[args.length - 2], "--");
    assert.equal(args[args.length - 1], "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  });
  test("regression: empty yt-dlp output is 404 and not cached", async () => {
    h.stub(() => "");
    assert.equal((await api.get("/api/stream/dQw4w9WgXcQ")).status, 404);
    assert.equal(cache.get("stream:dQw4w9WgXcQ"), undefined);
  });
  test("nearly-expired URL is returned but not cached", async () => {
    h.stub(() => "https://x.googlevideo.com/v?expire=" + (Math.floor(Date.now() / 1000) + 60));
    assert.equal((await api.get("/api/stream/dQw4w9WgXcQ")).status, 200);
    assert.equal(cache.get("stream:dQw4w9WgXcQ"), undefined);
  });
  test("timeout maps to 504", async () => {
    h.stub(() => Promise.reject(Object.assign(new Error("t"), { killed: true })));
    assert.equal((await api.get("/api/stream/dQw4w9WgXcQ")).status, 504);
  });
  test("Range header is harmless (audio bytes are served by the upstream CDN, not this API)", async () => {
    h.stub(() => STREAM);
    const r = await api.get("/api/stream/dQw4w9WgXcQ", { headers: { Range: "bytes=0-1" } });
    assert.equal(r.status, 200);
  });
});

describe("global behaviour", () => {
  const post = (body) => ({
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
  });
  test("regression: malformed JSON gives JSON 400 without stack trace", async () => {
    const r = await api.get("/api/search", post("{bad"));
    assert.equal(r.status, 400);
    assert.ok(!r.text.includes("node_modules") && !r.text.includes(" at "));
  });
  test("unknown route is JSON 404", async () => {
    const r = await api.get("/api/nope");
    assert.equal(r.status, 404);
    assert.equal(r.json.success, false);
  });
  test("oversized body rejected (413)", async () => {
    const r = await api.get("/api/search", post(JSON.stringify({ a: "x".repeat(20000) })));
    assert.equal(r.status, 413);
  });
  test("POST to GET-only route is 404 (no side effects)", async () => {
    assert.equal((await api.get("/api/trending", { method: "POST" })).status, 404);
  });
});
