function generateShortId(length = 10) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortId = "";
  for (let i = 0; i < length; i++) {
    shortId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return shortId;
}

module.exports = { generateShortId };
