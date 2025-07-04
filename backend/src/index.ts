import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { UserManager } from "./managers/UserManager";
import { offerInterface } from "./interface/interfaces";

const app = express();
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send("Running WEBRTC signinling server");
});
const usermanger = new UserManager();

io.on("connection", (socket) => {
  console.log("a user connected: " + socket.id);

  socket.on("joinRoom", (roomId) => {
    usermanger.addUser({ socketId: socket.id, roomId });
  });

  socket.on("offer", ({ roomId, sdp }: offerInterface) => {
    console.log("offer received from user: " + socket.id);

    const users = usermanger.roomManager.getRoomUsers(roomId);

    if (users) {
      users.forEach((user) => {
        if (user.socketId !== socket.id) {
          console.log("sending offer to user: " + user.socketId);
          io.to(user.socketId).emit("offer", {
            sdp,
            roomId,
          });
        }
      });
    }
  });

  socket.on("answer", ({ sdp, roomId }: offerInterface) => {
    console.log("answer received from user: " + socket.id);

    const users = usermanger.roomManager.getRoomUsers(roomId);

    if (users) {
      users.forEach((user) => {
        if (user.socketId !== socket.id) {
          console.log("sending answer to user: " + user.socketId);
          io.to(user.socketId).emit("answer", {
            sdp,
            roomId,
          });
        }
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected: " + socket.id);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
