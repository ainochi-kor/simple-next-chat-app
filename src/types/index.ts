import { User } from "firebase/auth";

interface Timestamp {
  nanoseconds: number;
  seconds: number;
}
export interface IMessage {
  sender: string;
  photoURL: string;
  text: string;
  timestamp: Timestamp;
}

export interface IChat {
  id: string;
  users: string[];
  usersData: User[];
  timestamp: Timestamp;
}
