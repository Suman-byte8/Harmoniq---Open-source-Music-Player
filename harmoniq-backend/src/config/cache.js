const NodeCache = require("node-cache");

const cache = new NodeCache({
  stdTTL: 3600, // default 1 hour
  checkperiod: 120,
  useClones: false,
  maxKeys: 1000, // prevent memory overflow
});

module.exports = cache;
