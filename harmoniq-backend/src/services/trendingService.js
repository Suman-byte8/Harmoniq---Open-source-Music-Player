const { execFile } = require('child_process');
const util = require('util');
const path = require('path');

const execFilePromise = util.promisify(execFile);

async function getTrending() {
  const scriptPath = path.join(
    __dirname,
    '../../python/trending.py'
  );

  const { stdout } = await execFilePromise('python', [scriptPath], {
    maxBuffer: 1024 * 1024 * 5,
  });

  return JSON.parse(stdout.trim());
}

module.exports = {
  getTrending,
};