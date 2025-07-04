export interface User {
  socketId: string;
  roomId: string;
}

export interface Room {
  user: User[];
}

export interface offerInterface {
  roomId: string;
  sdp: string;
}
