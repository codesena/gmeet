import { Room, User } from "../interface/interfaces";

export class RoomManager {
  private rooms: Map<string, Room>;

  constructor() {
    this.rooms = new Map<string, Room>();
  }

  createRoom(roomId: string) {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, { user: [] });
    }
  }

  addUserToRoom(user: User) {
    if (!this.rooms.has(user.roomId)) {
      this.createRoom(user.roomId);
    }
    const room = this.rooms.get(user.roomId);
    if (room) room.user.push(user);
  }

  removeUserFromRoom(socketId: string, roomId: string) {
    const room = this.rooms.get(roomId);
    if (room)
      room.user = room?.user.filter((user:User) => user.socketId !== socketId);
  }

  getRoomUsers(roomId: string): User[] | undefined {
    return this.rooms.get(roomId)?.user;
  }

  isRoomExists(roomId: string) {
    return this.rooms.has(roomId);
  }
}
