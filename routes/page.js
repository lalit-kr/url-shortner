const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");
const { getAnalytics } = require("../controllers/url");
const router = express.Router();

router.get("/", restrictTo(["normal", "admin"]), async (req, res) => {
  const urls = await URL.find({ createdBy: req.user._id });
  const isAdmin = req.user.role === "admin";
  return res.render("home", { title: "Homepage", urls, isAdmin });
});
router.get("/signup", async (req, res) => {
  return res.render("signup", { title: "Signup" });
});
router.get("/login", async (req, res) => {
  return res.render("login", { title: "Login" });
});
router.get("/user/login", async (req, res) => {
  return res.render("login", { title: "Login" });
});
router.get("/logout", async (req, res) => {
  req.user = null;
  res.clearCookie("token");
  return res.redirect("login");
});
router.get("/analytics/:shortid", getAnalytics);

router.get("/admin/urls", restrictTo(["admin"]), async (req, res, next) => {
  const allUrls = await URL.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $sort: {
        "user.name": 1,
      },
    },
    {
      $project: {
        _id: 1,
        shortId: 1,
        redirectUrl: 1,
        visitHistory: 1,
        "user.name": 1,
      },
    },
  ]);

  let isAdmin = false;
  for (let url of allUrls) {
    if (url.hasOwnProperty("user")) {
      isAdmin = true;
    }
  }
  return res.render("adminurls", {
    title: "Admin URLS",
    urls: allUrls,
    isAdmin,
  });
});

module.exports = router;
