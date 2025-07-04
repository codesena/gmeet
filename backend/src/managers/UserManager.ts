import { User } from "../interface/interfaces";
import { RoomManager } from "./RoomManger";

export class UserManager {
  private users: User[];
  roomManager: RoomManager;
  constructor() {
    this.users = [];
    this.roomManager = new RoomManager();
  }

  addUser(user: User) {
    console.log("user added with socketID:", user.socketId);
    this.users.push(user);
  }

  removeUser(socketId: string) {
    const roomId = this.users.find(
      (user) => user.socketId === socketId
    )?.roomId;
    this.users = this.users.filter((x) => x.socketId !== socketId);
    if (roomId) this.roomManager.removeUserFromRoom(socketId, roomId);
  }

  joinRoom(user: User) {
    this.roomManager.addUserToRoom(user);
  }
}
