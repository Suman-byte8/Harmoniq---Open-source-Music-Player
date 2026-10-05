const path = require("path");
const { runPythonJson } = require("../utils/run");

const SCRIPT = path.join(__dirname, "../../python/album.py");

async function getAlbum(title, artist) {
  const result = await runPythonJson(SCRIPT, [title, artist]);
  if (result.error) throw new Error(result.error);
  return result;
}

module.exports = { getAlbum };
