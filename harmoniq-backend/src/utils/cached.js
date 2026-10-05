const cache = require("../config/cache");

const inflight = new Map();

function store(key, value, ttl, swr) {
  try {
    const seconds = typeof ttl === "function" ? ttl(value) : ttl;
    if (seconds <= 0) return;
    // With stale-while-revalidate the data outlives its freshness by `swr` seconds;
    // a separate marker key says whether it is still fresh.
    cache.set(key, value, seconds + swr);
    if (swr > 0) cache.set(`fresh:${key}`, 1, seconds);
  } catch (err) {
    console.warn("Cache write skipped:", err.message);
  }
}

// De-duplicates concurrent loads of the same key.
function load(key, ttl, loader, swr) {
  let pending = inflight.get(key);
  if (!pending) {
    pending = (async () => {
      const value = await loader();
      store(key, value, ttl, swr);
      return value;
    })().finally(() => inflight.delete(key));
    inflight.set(key, pending);
  }
  return pending;
}

// Cache-aside with in-flight de-duplication: N concurrent identical requests
// trigger one upstream call. Failing to write the cache (e.g. it is full) never
// fails the request. `ttl` may be a number or a function of the result.
// opts.swr (seconds): serve an expired entry immediately for this long while
// refreshing it in the background. Not for values that become invalid (stream URLs).
async function cached(key, ttl, loader, { swr = 0 } = {}) {
  const hit = cache.get(key);
  if (hit !== undefined) {
    if (swr > 0 && cache.get(`fresh:${key}`) === undefined) {
      load(key, ttl, loader, swr).catch((err) =>
        console.warn(`Background refresh failed for ${key}:`, err.message),
      );
    }
    return { value: hit, cached: true };
  }
  return { value: await load(key, ttl, loader, swr), cached: false };
}

// Force a reload (used by the cache warmer).
async function refresh(key, ttl, loader, { swr = 0 } = {}) {
  return load(key, ttl, loader, swr);
}

module.exports = cached;
module.exports.refresh = refresh;
