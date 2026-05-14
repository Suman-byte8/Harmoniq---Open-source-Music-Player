const express = require("express");
const router = express.Router();

const searchRoutes = require("./search.routes.js");
const streamRoutes = require("./stream.routes.js");
const trendingRoutes = require("./trending.routes.js");

router.use("/search", searchRoutes);
router.use("/stream", streamRoutes);
router.use("/trending", trendingRoutes);

module.exports = router;
