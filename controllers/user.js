const USER = require("../models/user");
const { setUser } = require("../service/auth");

async function userSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    const user = await USER.create({ name, email, password });

    const token = setUser(user);
    setUser(user);
    res.cookie("token", token);
    res.status(201).redirect("/");
  } catch (err) {
    res.status(500).json({ error: "Server Error!" });
  }
}

async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await USER.findOne({ email, password });
    if (!user)
      return res.render("login", { error: "Invalid email or password!" });

    const token = setUser(user);
    setUser(user);
    res.cookie("token", token);
    return res.status(200).redirect("/");
  } catch (err) {
    return res
      .status(500)
      .render("login", { error: "Server Error! Please try again." });
  }
}

module.exports = { userSignup, userLogin };
