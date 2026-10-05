const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes");
const apiLimiter = require("./middleware/rateLimiter");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const app = express();

// ✅ Trust proxy is REQUIRED if hosting on Render/Railway
// so the rate limiter checks the user's real IP, not the hosting server's IP.
app.set("trust proxy", 1);

app.use(helmet());
// CORS_ORIGIN: comma-separated allowlist; unset = allow any origin (public read-only API).
const origins = (process.env.CORS_ORIGIN || "").split(",").map((o) => o.trim()).filter(Boolean);
app.use(cors(origins.length ? { origin: origins } : undefined));
app.use(express.json({ limit: "10kb" }));
app.use(
  morgan(process.env.NODE_ENV === "production" ? "combined" : "dev", {
    skip: () => process.env.NODE_ENV === "test",
  }),
);

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

app.use(notFound);
app.use(errorHandler);

module.exports = app;
