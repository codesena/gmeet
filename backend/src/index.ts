import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const app = express();
app.use(express.json());

const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("Running WEBRTC signinling server");
});

io.on("connection", (socket) => {
  console.log("a user connected: " + socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected: " + socket.id);
  });

  socket.on("message", (msg) => {
    console.log("message: " + msg);
    io.emit("message", msg);
  });

  socket.on("offer", (offer) => {
    // console.log("offer received");
    socket.broadcast.emit("offer", offer);
  });

  socket.on("answer", (answer) => {
    console.log("answer received");
    socket.broadcast.emit("answer", answer);
  });

  socket.on("candidate", (candidate) => {
    console.log("candidate received");
    socket.broadcast.emit("candidate", candidate);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
