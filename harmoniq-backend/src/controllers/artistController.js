const cache = require("../config/cache");
const { getArtist } = require("../services/artistService");

const ARTIST_TTL = 60 * 60; // 1 hour

exports.getArtistDetails = async (req, res) => {
  try {
    // Extract 'name' from query string instead of params
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: "Artist 'name' query parameter is required",
      });
    }

    const cacheKey = `artist:${name.toLowerCase().trim()}`;
    const cached = cache.get(cacheKey);

    if (cached) {
      return res.json({
        success: true,
        data: cached,
        cached: true,
      });
    }

    const result = await getArtist(name);

    cache.set(cacheKey, result, ARTIST_TTL);

    res.json({
      success: true,
      data: result,
      cached: false,
    });
  } catch (error) {
    console.error("Artist controller error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch artist details",
    });
  }
};
