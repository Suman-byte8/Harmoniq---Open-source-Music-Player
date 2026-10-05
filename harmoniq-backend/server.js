require("dotenv").config();
const app = require("./src/app");
const { stopWorker } = require("./src/utils/run");
const { startWarmer } = require("./src/utils/warm");

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Harmoniq API running on port ${PORT}`);
  if (process.env.WARM_CACHE !== "false") startWarmer();
});

// Graceful shutdown: stop accepting connections, let in-flight requests finish.
function shutdown(signal) {
  console.log(`${signal} received, shutting down`);
  server.close(() => {
    stopWorker();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000).unref();
}
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
