const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function getAudioStream(videoId) {
  const command = `yt-dlp -f bestaudio --get-url https://www.youtube.com/watch?v=${videoId} --no-warnings --quiet`;

  const { stdout } = await execPromise(command);

  return stdout.trim();
}

module.exports = {
  getAudioStream,
};