const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes");
const apiLimiter = require("./middleware/rateLimiter");
const app = express();

// ✅ Trust proxy is REQUIRED if hosting on Render/Railway
// so the rate limiter checks the user's real IP, not the hosting server's IP.
app.set("trust proxy", 1);

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check (we keep this outside the rate limiter so ping services like cron-job don't get blocked)
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ✅ Apply the rate limiter to all other /api routes
app.use("/api", apiLimiter);

// Register routes
app.use("/api", routes);

module.exports = app;
