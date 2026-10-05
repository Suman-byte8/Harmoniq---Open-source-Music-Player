const cached = require("../utils/cached");
const { getTrending } = require("../services/trendingService");

const TRENDING_TTL = 30 * 60; // 30 minutes

exports.trending = async (req, res) => {
  const { value, cached: hit } = await cached("trending", TRENDING_TTL, getTrending);
  res.json({ success: true, data: value, cached: hit });
};
