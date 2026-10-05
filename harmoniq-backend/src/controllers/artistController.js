const cached = require("../utils/cached");
const { stringParam, HttpError } = require("../utils/validate");
const { getArtist } = require("../services/artistService");

const ARTIST_TTL = 60 * 60; // 1 hour
const NOT_FOUND_TTL = 5 * 60;

exports.getArtistDetails = async (req, res) => {
  const name = stringParam(req.query.name, "name");
  const { value, cached: hit } = await cached(
    `artist:${name.toLowerCase()}`,
    (v) => (v ? ARTIST_TTL : NOT_FOUND_TTL),
    async () => (await getArtist(name)) || false,
  );
  if (!value) throw new HttpError(404, "Artist not found");
  res.json({ success: true, data: value, cached: hit });
};
