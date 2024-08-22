const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const serverPort = 8000;

const scoreboardFileName = "html/scoreboard.html";
const judgeInterfaceFileName = "html/judgeInterface.html";

const App = express();
App.use(express.static(__dirname + "/public"));
App.get("/", (req, res) => {
  res.sendFile(join(__dirname, judgeInterfaceFileName));
});
App.get("/scoreboard", (req, res) => {
  res.sendFile(join(__dirname, scoreboardFileName));
});

const server = createServer(App).listen(serverPort, () => {
  console.log(`server running on port: ${serverPort}`);
})

const io = new Server(server);
io.on("connection", (socket) => {
  console.log(`server connected: ${socket.id}`);
  socket.on("blueplus", () => {io.emit("blueplus")});
  socket.on("blueminus", () => {io.emit("blueminus")});
  socket.on("redplus", () => {io.emit("redplus")});
  socket.on("redminus", () => {io.emit("redminus")});
});