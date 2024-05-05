const URL = require("../models/url");
const { generateShortId } = require("../lib");
const USER = require("../models/user");

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
    return res.status(400).json({ error: "ShortId is required in the url" });

  try {
    const result = await URL.findOne({ shortId });
    const user = await USER.findById(result.createdBy);
    const isAdmin = user.role === "admin";

    return res.status(200).render("analytics", {
      title: "Analytics",
      urls: true,
      shortId: result.shortId,
      redirectsTo: result.redirectUrl,
      createdBy: user.name,
      createdAt: result.createdAt,
      totalClicks: result.visitHistory.length,
      isAdmin,
    });
  } catch (err) {
    return res.status(404).redirect("/");
  }
}

module.exports = { generateShortUrl, getAnalytics };
