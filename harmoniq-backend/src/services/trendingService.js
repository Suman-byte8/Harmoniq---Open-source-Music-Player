const { runPythonJson } = require("../utils/run");

async function getTrending() {
  return runPythonJson("trending", []);
}

module.exports = { getTrending };
