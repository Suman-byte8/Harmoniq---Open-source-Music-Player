const cache = require("../config/cache");

const inflight = new Map();

// Cache-aside with in-flight de-duplication: N concurrent identical requests
// trigger one upstream call. Failing to write the cache (e.g. it is full) never
// fails the request. `ttl` may be a number or a function of the result.
async function cached(key, ttl, loader) {
  const hit = cache.get(key);
  if (hit !== undefined) return { value: hit, cached: true };

  let pending = inflight.get(key);
  if (!pending) {
    pending = (async () => {
      const value = await loader();
      try {
        const seconds = typeof ttl === "function" ? ttl(value) : ttl;
        if (seconds > 0) cache.set(key, value, seconds);
      } catch (err) {
        console.warn("Cache write skipped:", err.message);
      }
      return value;
    })().finally(() => inflight.delete(key));
    inflight.set(key, pending);
  }
  return { value: await pending, cached: false };
}

module.exports = cached;
