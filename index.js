const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
require("./config"); // Mongo Connection
const { logReqRes } = require("./middlewares");
const urlRouter = require("./routes/url");
const pageRouter = require("./routes/page");
const userRouter = require("./routes/user");
const URL = require("./models/url");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

const app = express();

// Set View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares - Plugin
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);
app.use(logReqRes());

//Routes
app.use("/url", restrictTo(["normal", "admin"]), urlRouter);
app.use("/", pageRouter);
app.get("/:shortid", async (req, res) => {
  const shortId = req.params.shortid;
  if (!shortId)
    res.status(400).json({ error: "ShortId is required in the url" });
  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } }
    );

    res.status(302).redirect(entry.redirectUrl);
  } catch (err) {
    res.status(404).json({ msg: "ShortId Not Found!" });
  }
});
app.use("/user", userRouter);

app.listen(process.env.PORT || 4979, () => console.log(`Server running`));
