import { atom } from "recoil";
import { UserType } from "../types/user";
import { ChatRoomType, MessageType } from "../types/chat";

const chatRoomMessagesInitial : MessageType[] = [];

export const chatRoomMessagesState = atom<MessageType[]>({
  key: "chatRoomMessagesSt2ate",
  default: chatRoomMessagesInitial,
});

const userInital : UserType = {
  id: "",
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

export const chatRoomInformationState = atom<ChatRoomType>( {
  key: "chatRoomInformationState",
  default: {
    id:-1,
    name:"",
    description: "",
    users:[],
    owner: ""
  }
})