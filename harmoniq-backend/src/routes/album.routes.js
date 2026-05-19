const express = require("express");
const router = express.Router();
const { getAlbumDetails } = require("../controllers/albumController");

// Changed from /:albumId to /
router.get("/", getAlbumDetails);

module.exports = router;
