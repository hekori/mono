import express = require("express");
const app = express();
import http = require("http");
const server = http.createServer(app);
import { Server } from "socket.io";
import jwt = require("jsonwebtoken");

console.log("NX_JWT_PRIVATE_KEY=", process.env.NX_JWT_PRIVATE_KEY);
console.log(jwt.sign("haha", process.env.NX_JWT_PRIVATE_KEY));

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.use(function (socket, next) {
  console.log(socket.handshake.query);
  if (socket.handshake.query && socket.handshake.query.accessToken) {
    try {
      setInterval(() => {
        socket.emit("news", { hello: "world" });
      }, 1000);

      const decoded = jwt.verify(
        socket.handshake.query.accessToken,
        process.env.NX_JWT_PRIVATE_KEY
      );
      console.log("decoded=", decoded);
    } catch (e) {
      console.log("error in verification");
      return next(new Error("Authentication error"));
    }
  } else {
    console.log("error");
    next(new Error("Authentication error"));
  }
  next();
});

io.on("connection", function (socket) {
  // Connection now authenticated to receive further events
  console.log("a user connected");

  socket.on("message", function (message) {
    io.emit("message", message);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
