const cache = require('../config/cache');
const { getAudioStream } = require('../services/ytdlpService');

const STREAM_TTL = 4 * 60 * 60; // 4 hours

exports.getStream = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!videoId) {
      return res.status(400).json({
        success: false,
        error: "videoId is required",
      });
    }

    const cacheKey = `stream:${videoId}`;
    const cached = cache.get(cacheKey);

    if (cached) {
      return res.json({
        success: true,
        data: { url: cached },
        cached: true,
      });
    }

    const streamUrl = await getAudioStream(videoId);

    cache.set(cacheKey, streamUrl, STREAM_TTL);

    res.json({
      success: true,
      data: { url: streamUrl },
      cached: false,
    });
  } catch (error) {
    console.error("Stream error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to get stream URL",
    });
  }
};