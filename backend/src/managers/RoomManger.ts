import { initHandlers, User } from "./UserManager";

let globalRoomId = 0;
interface Room {
  user1: User;
  user2: User;
}
export class RoomManager {
  private rooms: Map<string, Room>;
  constructor() {
    this.rooms = new Map<string, Room>();
  }
  createRoom(user1: User, user2: User) {
    const roomId = this.generateRoomId();
    this.rooms.set(roomId.toString(), {
      user1,
      user2,
    });
    user1.socket.emit("send-offer", {
      room: roomId,
    });
  }

  onOffer({ roomId, sdp }: initHandlers) {
    this.rooms.get(roomId)?.user2.socket.emit("offer", {
      sdp,
      roomId,
    });
  }

  onAnswer({ roomId, sdp }: initHandlers) {
    this.rooms.get(roomId)?.user1.socket.emit("answer", {
      sdp,
      roomId,
    });
  }

  generateRoomId() {
    return globalRoomId++;
  }
}
