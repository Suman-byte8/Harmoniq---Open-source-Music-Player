const { runPythonJson } = require("../utils/run");

// Prefer albumId (exact tracklist); fall back to a title+artist song search.
async function getAlbum({ albumId, title, artist }) {
  const args = albumId ? ["--id", albumId] : [title, artist];
  const result = await runPythonJson("album", args);
  if (result.error) throw new Error(result.error);
  return result;
}

module.exports = { getAlbum };
