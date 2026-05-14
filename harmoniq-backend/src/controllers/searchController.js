const cache = require("../config/cache");
const { searchMusic } = require("../services/ytmusicService");

const SEARCH_TTL = 60 * 60; // 1 hour

exports.searchSongs = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: "Query parameter 'q' is required",
      });
    }

    // ✅ Normalize cache key
    const normalizedQuery = q.toLowerCase().trim();
    const cacheKey = `search:${normalizedQuery}`;

    const cached = cache.get(cacheKey);

    if (cached) {
      return res.json({
        success: true,
        data: cached,
        cached: true,
      });
    }

    const results = await searchMusic(normalizedQuery, 8);

    cache.set(cacheKey, results, SEARCH_TTL);

    res.json({
      success: true,
      data: results,
      cached: false,
    });
  } catch (error) {
    console.error("Search error:", error.message);

    res.status(500).json({
      success: false,
      error: "Search failed",
    });
  }
};
