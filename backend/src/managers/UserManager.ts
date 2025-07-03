import { Socket } from "socket.io";
import { RoomManager } from "./RoomManger";

export interface User {
  socket: Socket;
  name: string;
}
export interface initHandlers {
  roomId: string;
  sdp: string;
}
export class UserManager {
  private users: User[];
  private roomManager: RoomManager;
  constructor() {
    this.users = [];
    this.roomManager = new RoomManager();
  }
  addUser(user: User) {
    this.users.push(user);
    this.initHandlers(user.socket);
  }
  removeUser(socketId: string) {
    this.users = this.users.filter((x) => x.socket.id !== socketId);
  }
  callUsers() {
    if (this.users.length === 0) {
      return [];
    }
    const user1 = this.users[0];
    const user2 = this.users[1];
    this.roomManager.createRoom(user1, user2);
  }

  initHandlers(socket: Socket) {
    // care here normal function will not work as it behaves differently  with this keyword but arrow function will work
    socket.on("offer", ({ roomId, sdp }: initHandlers) => {
      this.roomManager.onOffer({ roomId, sdp });
    });
    socket.on("answer", ({ roomId, sdp }: initHandlers) => {
      this.roomManager.onAnswer({ roomId, sdp });
    });
  }
}
