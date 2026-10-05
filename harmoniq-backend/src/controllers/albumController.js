const cached = require("../utils/cached");
const { stringParam, albumIdParam } = require("../utils/validate");
const { getAlbum } = require("../services/albumService");

const ALBUM_TTL = 24 * 60 * 60; // 24 hours

// GET /api/album?albumId=MPREb_...            (exact tracklist, preferred)
// GET /api/album?title=...&artist=...         (best-effort search fallback)
exports.getAlbumDetails = async (req, res) => {
  let params;
  let key;
  if (req.query.albumId !== undefined) {
    const albumId = albumIdParam(req.query.albumId);
    params = { albumId };
    key = `album:id:${albumId}`;
  } else {
    const title = stringParam(req.query.title, "title");
    const artist = stringParam(req.query.artist, "artist");
    params = { title, artist };
    key = `album:${JSON.stringify([title.toLowerCase(), artist.toLowerCase()])}`;
  }
  const { value, cached: hit } = await cached(key, ALBUM_TTL, () => getAlbum(params));
  res.json({ success: true, data: value, cached: hit });
};
