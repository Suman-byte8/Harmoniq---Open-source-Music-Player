const rateLimit = require("express-rate-limit");

const make = (max, message) =>
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max,
    message: { success: false, error: message },
    standardHeaders: true,
    legacyHeaders: false,
  });

// General limit for all /api routes: 100 requests / 15 min / IP.
const apiLimiter = make(
  100,
  "Too many requests from this IP, please try again after 15 minutes.",
);

// Cache misses spawn Python/yt-dlp processes, so cap them more tightly.
const expensiveLimiter = make(60, "Too many lookups from this IP, please slow down.");

module.exports = apiLimiter;
module.exports.expensiveLimiter = expensiveLimiter;
