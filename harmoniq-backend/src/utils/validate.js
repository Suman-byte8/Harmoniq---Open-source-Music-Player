const MAX_QUERY_LENGTH = 200;
const VIDEO_ID_RE = /^[A-Za-z0-9_-]{11}$/;

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.expose = true;
  }
}

// Express parses repeated params (?q=a&q=b) into arrays and q[x]=1 into objects.
// Only a single, non-empty, bounded string is acceptable.
function stringParam(value, name, maxLength = MAX_QUERY_LENGTH) {
  if (value === undefined || value === null || value === "") {
    throw new HttpError(400, `'${name}' query parameter is required`);
  }
  if (typeof value !== "string") {
    throw new HttpError(400, `'${name}' must be a single string`);
  }
  const trimmed = value.trim();
  if (!trimmed) throw new HttpError(400, `'${name}' query parameter is required`);
  if (trimmed.length > maxLength) {
    throw new HttpError(400, `'${name}' must be at most ${maxLength} characters`);
  }
  return trimmed;
}

function videoIdParam(value) {
  if (typeof value !== "string" || !VIDEO_ID_RE.test(value)) {
    throw new HttpError(400, "videoId must be an 11-character YouTube video id");
  }
  return value;
}

function albumIdParam(value) {
  if (typeof value !== "string" || !/^[A-Za-z0-9_-]{1,64}$/.test(value)) {
    throw new HttpError(400, "albumId is invalid");
  }
  return value;
}

module.exports = { HttpError, stringParam, videoIdParam, albumIdParam, MAX_QUERY_LENGTH };
