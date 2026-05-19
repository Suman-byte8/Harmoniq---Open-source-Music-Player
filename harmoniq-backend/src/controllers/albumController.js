const cache = require("../config/cache");
const { getAlbum } = require("../services/albumService");

const ALBUM_TTL = 24 * 60 * 60; // 24 hours

exports.getAlbumDetails = async (req, res) => {
  try {
    const { title, artist } = req.query;

    if (!title || !artist) {
      return res.status(400).json({
        success: false,
        error: "Both 'title' and 'artist' query parameters are required",
      });
    }

    const cacheKey = `album:${title.toLowerCase()}:${artist.toLowerCase()}`;
    const cached = cache.get(cacheKey);

    if (cached) {
      return res.json({
        success: true,
        data: cached,
        cached: true,
      });
    }

    const result = await getAlbum(title, artist);

    cache.set(cacheKey, result, ALBUM_TTL);

    res.json({
      success: true,
      data: result,
      cached: false,
    });
  } catch (error) {
    console.error("Album controller error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch album details",
    });
  }
};
