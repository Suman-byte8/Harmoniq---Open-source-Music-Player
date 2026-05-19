const express = require("express");
const router = express.Router();
const { getArtistDetails } = require("../controllers/artistController");

// Changed from /:artistId to /
router.get("/", getArtistDetails);

module.exports = router;
