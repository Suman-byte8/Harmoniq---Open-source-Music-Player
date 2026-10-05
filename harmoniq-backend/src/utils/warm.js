const { warmTrending } = require("../controllers/trendingController");

const INTERVAL_MS = 25 * 60 * 1000; // just under the 30 min trending TTL

// Pre-fills the cache for the home screen and keeps it fresh. Also keeps the
// Python worker (and its HTTP connection) warm so first real searches are fast.
function startWarmer() {
  const tick = () =>
    warmTrending().catch((err) => console.warn("Cache warm-up failed:", err.message));
  tick();
  return setInterval(tick, INTERVAL_MS).unref();
}

module.exports = { startWarmer };
