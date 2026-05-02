const Log = require("./logger");

function loggingMiddleware(req, res, next) {
  Log("backend", "info", "middleware", `${req.method} ${req.url}`);
  next();
}

module.exports = loggingMiddleware;