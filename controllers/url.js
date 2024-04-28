const URL = require("../models/url");
const { generateShortId } = require("../lib");

async function generateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "Url is required" });

  try {
    const shortId = generateShortId(8);
    await URL.create({
      shortId,
      redirectUrl: body.url,
      visitHistory: [],
      createdBy: req.user._id,
    });
    res.status(201).render("home", { id: shortId });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
}

async function getAnalytics(req, res) {
  const shortId = req.params.shortid;
  if (!shortId)
    res.status(400).json({ error: "ShortId is required in the url" });

  try {
    const result = await URL.findOne({ shortId });

    res.status(200).json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (err) {
    res.status(404).json({ msg: "ShortId Not Found!" });
  }
}

module.exports = { generateShortUrl, getAnalytics };
