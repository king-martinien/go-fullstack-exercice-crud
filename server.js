const http = require("http");
const app = require("./app");

const normalizePort = (enteredPort) => {
  const port = parseInt(enteredPort, 10);
  if (isNaN(port)) {
    return enteredPort;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || "3000");

app.set("port", port);

const server = http.createServer(app);

server.on("listening", () => {
  console.log("listenin on port : " + port);
});

server.listen(port);
