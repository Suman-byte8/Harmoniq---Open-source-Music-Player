const path = require("path");
const { runPythonJson } = require("../utils/run");

const SCRIPT = path.join(__dirname, "../../python/trending.py");

async function getTrending() {
  return runPythonJson(SCRIPT, []);
}

module.exports = { getTrending };
