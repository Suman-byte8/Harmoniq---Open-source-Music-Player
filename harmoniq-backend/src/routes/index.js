const express = require("express");
const router = express.Router();
const { expensiveLimiter } = require("../middleware/rateLimiter");

const searchRoutes = require("./search.routes.js");
const streamRoutes = require("./stream.routes.js");
const trendingRoutes = require("./trending.routes.js");
const artistRoutes = require("./artist.routes");
const albumRoutes = require("./album.routes");

// Stricter limit on routes that can spawn Python / yt-dlp processes.
router.use(expensiveLimiter);
router.use("/search", searchRoutes);
router.use("/stream", streamRoutes);
router.use("/trending", trendingRoutes);
router.use("/artist", artistRoutes);
router.use("/album", albumRoutes);

module.exports = router;
