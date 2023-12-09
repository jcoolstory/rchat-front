import { atom } from "recoil";
import { Message } from "../api/model/chat";

const chatRoomMessagesInitial : Message[] = [];

export const chatRoomMessagesState = atom<Message[]>({
  key: "chatRoomMessagesSt2ate",
  default: chatRoomMessagesInitial,
});

export type UserType = {
  id: string,
  name: string
}

const userInital : UserType = {
  id: "me",
  name: ""
}

export const userState = atom<UserType> ({
  key: "userState",
  default: userInital 
})

type ReceiveData = {
  lastIndex: number,
  timestamp : number
}

export type LastReciveMessagesType = {
  [k:string]: ReceiveData
}

export const lastReciveMessagesState = atom<LastReciveMessagesType|any>( {
  key: "lastReciveMessagesState",
  default: {
  }
})