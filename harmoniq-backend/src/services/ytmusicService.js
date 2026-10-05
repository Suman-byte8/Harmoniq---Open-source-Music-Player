const path = require("path");
const { runPythonJson } = require("../utils/run");

const SCRIPT = path.join(__dirname, "../../python/search_music.py");

async function searchMusic(query, limit = 8) {
  return runPythonJson(SCRIPT, [query, String(limit)]);
}

module.exports = { searchMusic };
