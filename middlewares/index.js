const LOG = require(__dirname + "/../models/log");

function logReqRes() {
  return async (req, res, next) => {
    const data = { ipAddress: req.ip, method: req.method, path: req.path };
    await LOG.create(data);
    next();
  };
}

module.exports = { logReqRes };
