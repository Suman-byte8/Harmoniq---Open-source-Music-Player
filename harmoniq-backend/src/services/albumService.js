const { execFile } = require("child_process");
const util = require("util");
const path = require("path");

const execFilePromise = util.promisify(execFile);

async function getAlbum(title, artist) {
  try {
    const scriptPath = path.join(__dirname, "../../python/album.py");

    const { stdout } = await execFilePromise(
      "python",
      [scriptPath, title, artist],
      {
        maxBuffer: 1024 * 1024 * 5,
      },
    );

    const result = JSON.parse(stdout.trim());

    if (result.error) {
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    console.error("Album service error:", error.message);
    throw new Error("Failed to fetch album");
  }
}

module.exports = {
  getAlbum,
};
