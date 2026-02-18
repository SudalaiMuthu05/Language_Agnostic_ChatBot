// // test-server.js
// import express from "express";
// const app = express();
// const PORT = 5001;
// app.get("/ping", (req, res) => res.json({ ok: true, time: new Date().toISOString() }));
// app.listen(PORT, () => console.log(`Test server listening on http://localhost:${PORT}`));

// test-server.mjs
import http from "http";
const PORT = 5001;
const srv = http.createServer((req, res) => {
  if (req.url === "/ping") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true, now: new Date().toISOString() }));
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});
srv.listen(PORT, () => console.log(`Test server listening on http://localhost:${PORT}`));
srv.on("error", (err) => console.error("Server error:", err && err.message));
