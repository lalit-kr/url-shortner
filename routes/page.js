const express = require("express");
const URL = require("../models/url");
const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.user) return res.status(403).redirect("/login");
  const urls = await URL.find({ createdBy: req.user._id });
  return res.render("home", { urls });
});
router.get("/signup", async (req, res) => {
  return res.render("signup");
});
router.get("/login", async (req, res) => {
  return res.render("login");
});

module.exports = router;
