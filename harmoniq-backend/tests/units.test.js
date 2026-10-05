const { test, describe } = require("node:test");
const assert = require("node:assert/strict");
const { streamTtlSeconds, streamExpiry } = require("../src/services/ytdlpService");
const { videoIdParam } = require("../src/utils/validate");

describe("streamTtlSeconds", () => {
  const now = 1_000_000_000_000;
  const at = (s) => `https://h/v?expire=${now / 1000 + s}`;
  test("caps at max", () => assert.equal(streamTtlSeconds(at(99999), 14400, now), 14400));
  test("uses remaining minus 5 min margin", () =>
    assert.equal(streamTtlSeconds(at(1000), 14400, now), 700));
  test("0 when about to expire", () => assert.equal(streamTtlSeconds(at(100), 14400, now), 0));
  test("default when no expire param", () =>
    assert.equal(streamTtlSeconds("https://h/v", 14400, now), 14400));
  test("expiry ISO", () => assert.equal(streamExpiry(at(0)), new Date(now).toISOString()));
});

test("videoIdParam accepts real ids", () => {
  assert.equal(videoIdParam("dQw4w9WgXcQ"), "dQw4w9WgXcQ");
  assert.equal(videoIdParam("-_-_-_-_-_-"), "-_-_-_-_-_-");
});
