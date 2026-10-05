const { runPythonJson } = require("../utils/run");

async function searchMusic(query, limit = 8) {
  return runPythonJson("search", [query, String(limit)]);
}

module.exports = { searchMusic };
