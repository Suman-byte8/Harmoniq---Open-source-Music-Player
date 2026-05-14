const express = require("express");
const router = express.Router();
const { getStream } = require("../controllers/streamController");

router.get("/:videoId", getStream);

module.exports = router;
