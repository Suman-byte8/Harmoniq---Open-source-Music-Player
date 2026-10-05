const cached = require("../utils/cached");
const { stringParam } = require("../utils/validate");
const { searchMusic } = require("../services/ytmusicService");

const SEARCH_TTL = 60 * 60; // 1 hour

exports.searchSongs = async (req, res) => {
  const q = stringParam(req.query.q, "q").toLowerCase();
  const { value, cached: hit } = await cached(`search:${q}`, SEARCH_TTL, () =>
    searchMusic(q, 8),
  );
  res.json({ success: true, data: value, cached: hit });
};
