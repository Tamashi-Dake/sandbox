import express from "express";
import http from "http";

import cors from "cors";

import { Server } from "socket.io";

// Khởi tạo ứng dụng Express
const app = express();

const CLIENT_URL = "http://localhost:5173";
const ALLOWED_METHOD = ["GET", "POST"];
const DEV_PORT = 3000;

const E_Socket_Event = {
  CONNECTION: "connection",
  SEND_MESSAGE: "send_message",
  RECEIVE_MESSAGE: "receive_message",
};

// Middleware CORS
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

// Middleware khác
app.use(
  express.json({
    limit: "5mb",
  })
);

// Tạo và khởi động máy chủ HTTP
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ALLOWED_METHOD,
  },
});

io.on(E_Socket_Event.CONNECTION, (socket) => {
  console.log("user id:", socket.id);

  socket.on(E_Socket_Event.SEND_MESSAGE, (data) => {
    console.log(data);

    socket.broadcast.emit(E_Socket_Event.RECEIVE_MESSAGE, data);
  });
});

server.listen(DEV_PORT, () => {
  console.log(`Server running at port ${DEV_PORT}`);
});
