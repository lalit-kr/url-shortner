const { getUser } = require("../service/auth");

async function restricToLoggedInUser(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) return res.status(403).redirect("/login");

  const user = getUser(userUid);
  if (!user) return res.status(404).redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;
  const user = getUser(userUid);
  req.user = user;
  next();
}

module.exports = { restricToLoggedInUser, checkAuth };
