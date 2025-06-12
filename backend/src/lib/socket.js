import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const serverHTTP = http.createServer(app);
const io = new Server(serverHTTP, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("un utilisateur s'est connecté", socket.id);

  socket.on("disconnect", () => {
    console.log("un utilisateur s'est déconnecté", socket.id);
  });
});

export { serverHTTP, io, app };