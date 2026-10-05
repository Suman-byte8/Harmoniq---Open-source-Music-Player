const { run, YTDLP } = require("../utils/run");

// videoId must already be validated (see utils/validate.js). Arguments are passed
// to execFile without a shell, and "--" stops yt-dlp parsing the URL as an option.
async function getAudioStream(videoId) {
  const stdout = await run(YTDLP, [
    "-f",
    "bestaudio",
    "--get-url",
    "--no-warnings",
    "--quiet",
    "--no-playlist",
    "--",
    `https://www.youtube.com/watch?v=${videoId}`,
  ]);

  const url = stdout.trim().split(/\r?\n/)[0];
  if (!/^https:\/\//.test(url || "")) {
    const err = new Error("No playable stream found");
    err.status = 404;
    err.expose = true;
    throw err;
  }
  return url;
}

function expireOf(url) {
  try {
    const expire = Number(new URL(url).searchParams.get("expire"));
    return expire > 0 ? expire : null;
  } catch {
    return null;
  }
}

// Signed stream URLs carry an `expire` unix timestamp; never cache past it.
function streamTtlSeconds(url, maxSeconds = 4 * 60 * 60, now = Date.now()) {
  const expire = expireOf(url);
  if (!expire) return maxSeconds;
  const remaining = Math.floor(expire - now / 1000) - 300; // 5 min safety margin
  return Math.max(0, Math.min(maxSeconds, remaining));
}

function streamExpiry(url) {
  const expire = expireOf(url);
  return expire ? new Date(expire * 1000).toISOString() : null;
}

module.exports = { getAudioStream, streamTtlSeconds, streamExpiry };
