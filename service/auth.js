const jwt = require("jsonwebtoken");
const secret = "Q@w#z%X^A!s@l*U&G67";

function setUser(user) {
  return jwt.sign({ _id: user._id, email: user.email }, secret);
}

function getUser(token) {
  try {
    if (!token) return null;
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
}

module.exports = { setUser, getUser };
