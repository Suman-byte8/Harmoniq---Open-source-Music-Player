// Test double for python/worker.py (JSON lines over stdin/stdout).
require("readline").createInterface({ input: process.stdin }).on("line", (line) => {
  const { id, cmd, args } = JSON.parse(line);
  if (cmd === "crash") process.exit(1);
  if (cmd === "fail") return console.log(JSON.stringify({ id, error: "boom" }));
  setTimeout(() => console.log(JSON.stringify({ id, result: args[0] })), args[1] || 0);
});
