const cached = require("../utils/cached");
const { videoIdParam } = require("../utils/validate");
const {
  getAudioStream,
  streamTtlSeconds,
  streamExpiry,
} = require("../services/ytdlpService");

exports.getStream = async (req, res) => {
  const videoId = videoIdParam(req.params.videoId);
  const { value: url, cached: hit } = await cached(
    `stream:${videoId}`,
    (u) => streamTtlSeconds(u),
    () => getAudioStream(videoId),
  );
  // Clients should re-request this endpoint if playback fails (403/410) or after expiresAt.
  res.json({ success: true, data: { url, expiresAt: streamExpiry(url) }, cached: hit });
};
