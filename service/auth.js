const jwt = require("jsonwebtoken");
require("dotenv").config();

function setUser(user) {
  return jwt.sign(
    { _id: user._id, email: user.email, role: user.role },
    secret
  );
}

function getUser(token) {
  try {
    if (!token) return null;
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = { setUser, getUser };
