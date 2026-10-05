const path = require("path");
const { runPythonJson } = require("../utils/run");

const SCRIPT = path.join(__dirname, "../../python/artist.py");

// Resolves to null when no artist matches.
async function getArtist(name) {
  const result = await runPythonJson(SCRIPT, [name]);
  if (result.error) throw new Error(result.error);
  return result.artistId ? result : null;
}

module.exports = { getArtist };
