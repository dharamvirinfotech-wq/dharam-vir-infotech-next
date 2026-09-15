import http from "http";
import next from "next";

const port = Number(process.env.PORT) || 3010;
const hostname = process.env.HOSTNAME || "0.0.0.0";

const app = next({
  dev: false,
  hostname,
  port,
});

const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = http.createServer((req, res) => {
      handle(req, res);
    });

    server.listen(port, hostname, () => {
      console.log(
        `Next.js application running on ${hostname}:${port}`
      );
    });

    server.on("error", (error) => {
      console.error("Server error:", error);
      process.exit(1);
    });
  })
  .catch((error) => {
    console.error("Next.js startup error:", error);
    process.exit(1);
  });
