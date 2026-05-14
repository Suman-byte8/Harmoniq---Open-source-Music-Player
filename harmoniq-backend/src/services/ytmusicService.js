const { execFile } = require('child_process');
const util = require('util');
const path = require('path');

const execFilePromise = util.promisify(execFile);

async function searchMusic(query, limit = 8) {
  try {
    const scriptPath = path.join(
      __dirname,
      '../../python/search_music.py'
    );

    const { stdout } = await execFilePromise('python', [
      scriptPath,
      query,
      limit.toString(),
    ], {
      maxBuffer: 1024 * 1024 * 5,
    });

    return JSON.parse(stdout.trim());
  } catch (error) {
    console.error("Python search error:", error.message);
    throw new Error("Music search failed");
  }
}

module.exports = {
  searchMusic,
};