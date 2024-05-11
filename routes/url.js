const express = require("express");
const router = express.Router();
const { generateShortUrl } = require(__dirname + "/../controllers/url");

router.post("/", generateShortUrl);

module.exports = router;
