const USER = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function userSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    const result = await USER.create({ name, email, password });

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
      res.status(400).render("login", { error: "Invalid email or password!" });

    const token = setUser(user);
    setUser(user);
    res.cookie("uid", token);
    res.status(200).redirect("/");
  } catch (err) {
    res.status(500).json({ error: "Server Error!" });
  }
}

module.exports = { userSignup, userLogin };
