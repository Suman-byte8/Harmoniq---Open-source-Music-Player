const { execFile } = require("child_process");
const util = require("util");
const path = require("path");

const execFilePromise = util.promisify(execFile);

async function getArtist(artistId) {
  try {
    const scriptPath = path.join(__dirname, "../../python/artist.py");

    const { stdout } = await execFilePromise("python", [scriptPath, artistId], {
      maxBuffer: 1024 * 1024 * 5,
    });

    return JSON.parse(stdout.trim());
  } catch (error) {
    console.error("Artist service error:", error.message);
    throw new Error("Failed to fetch artist");
  }
}

module.exports = {
  getArtist,
};
