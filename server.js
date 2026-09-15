const { createServer } = require("http");
const next = require("next");

const port = process.env.PORT || 3000;
const hostname = "0.0.0.0";

const app = next({
  dev: false,
  hostname,
  port
});

const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    createServer(async (req, res) => {
      try {
        await handle(req, res);
      } catch (err) {
        console.error(err);
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    }).listen(port, hostname, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.error("Next.js startup error:", err);
    process.exit(1);
  });
