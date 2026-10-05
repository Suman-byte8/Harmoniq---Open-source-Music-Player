const cached = require("../utils/cached");
const { stringParam } = require("../utils/validate");
const { getAlbum } = require("../services/albumService");

const ALBUM_TTL = 24 * 60 * 60; // 24 hours

exports.getAlbumDetails = async (req, res) => {
  const title = stringParam(req.query.title, "title");
  const artist = stringParam(req.query.artist, "artist");
  const key = `album:${JSON.stringify([title.toLowerCase(), artist.toLowerCase()])}`;
  const { value, cached: hit } = await cached(key, ALBUM_TTL, () =>
    getAlbum(title, artist),
  );
  res.json({ success: true, data: value, cached: hit });
};
