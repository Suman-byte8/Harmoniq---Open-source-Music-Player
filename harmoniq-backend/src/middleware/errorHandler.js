const { HttpError } = require("../utils/validate");

function notFound(req, res) {
  res.status(404).json({ success: false, error: "Route not found" });
}

// Express 5 forwards rejected async handlers here. Never leak stack traces or paths.
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  let status = err.status || err.statusCode || 500;
  let message = "Internal server error";

  if (err.type === "entity.parse.failed") {
    status = 400;
    message = "Malformed JSON body";
  } else if (err instanceof HttpError || err.expose) {
    message = err.message;
  } else if (status === 504) {
    message = "Upstream request timed out";
  } else if (status >= 500) {
    // Failures of the upstream tools (ytmusicapi / yt-dlp) are bad-gateway; a
    // missing binary is a server misconfiguration.
    if (err.code === "ENOENT") {
      status = 500;
    } else {
      status = 502;
      message = "Upstream provider failed";
    }
  }

  if (status >= 500) console.error(`[${req.method} ${req.path}]`, err.message);
  res.status(status).json({ success: false, error: message });
}

module.exports = { notFound, errorHandler };
