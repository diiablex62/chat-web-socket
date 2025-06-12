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

export { serverHTTP, io, app };