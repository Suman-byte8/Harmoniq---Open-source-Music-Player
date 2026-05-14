const cache = require("../config/cache");
const { getTrending } = require("../services/trendingService");

const TRENDING_TTL = 30 * 60; // 30 minutes

exports.trending = async (req, res) => {
  try {
    const cacheKey = "trending";
    const cached = cache.get(cacheKey);

    if (cached) {
      return res.json({
        success: true,
        data: cached,
        cached: true,
      });
    }

    const results = await getTrending();

    cache.set(cacheKey, results, TRENDING_TTL);

    res.json({
      success: true,
      data: results,
      cached: false,
    });
  } catch (error) {
    console.error("Trending error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch trending",
    });
  }
};
