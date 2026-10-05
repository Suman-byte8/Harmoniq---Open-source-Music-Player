const NodeCache = require("node-cache");

const cache = new NodeCache({
  stdTTL: 3600, // default 1 hour
  checkperiod: 120,
  useClones: false,
  maxKeys: 10000, // node-cache throws on set() beyond this; callers go through utils/cached.js
});

module.exports = cache;
