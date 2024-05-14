const USER = require(__dirname + "/../models/user");
const { setUser } = require("../service/auth");
const bcrypt = require("bcrypt");
// const { setUser } = require(__dirname + "/../service/auth");
const saltRounds = 10;
console.log(__dirname + "/../service/auth");

async function userSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, saltRounds);

    const user = await USER.create({ name, email, password: hash_password });

    const token = setUser(user);
    setUser(user);
    res.cookie("token", token);
    res.status(201).redirect("/");
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .render("signup", { error: "Server Error! Please try again." });
  }
}

async function userLogin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await USER.findOne({ email });

    if (!user) return res.render("login", { error: "Invalid email " });

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.render("login", { error: "Invalid password " });
    }

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
