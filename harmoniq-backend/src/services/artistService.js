const { runPythonJson } = require("../utils/run");

// Resolves to null when no artist matches.
async function getArtist(name) {
  const result = await runPythonJson("artist", [name]);
  if (result.error) throw new Error(result.error);
  return result.artistId ? result : null;
}

module.exports = { getArtist };
