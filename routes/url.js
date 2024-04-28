const express = require("express");
const router = express.Router();
const { generateShortUrl, getAnalytics } = require("../controllers/url");

router.post("/", generateShortUrl);
router.get("/analytics/:shortid", getAnalytics);

module.exports = router;
