const cached = require("../utils/cached");
const { getTrending } = require("../services/trendingService");

const KEY = "trending";
const TRENDING_TTL = 30 * 60; // 30 minutes
const OPTS = { swr: 6 * 60 * 60 }; // keep serving a stale list for up to 6 h while refreshing

exports.trending = async (req, res) => {
  const { value, cached: hit } = await cached(KEY, TRENDING_TTL, getTrending, OPTS);
  res.json({ success: true, data: value, cached: hit });
};

// Called at boot and on a timer (see utils/warm.js) so users rarely wait on a miss.
exports.warmTrending = () => cached.refresh(KEY, TRENDING_TTL, getTrending, OPTS);
