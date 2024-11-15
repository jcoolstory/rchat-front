import { atom, selector } from "recoil";
import { UserType } from "../types/user";
import { ChatRoomType, ChatMessageType } from "../types/chat";
import { WSManager } from "common/model/WSManager";

const chatRoomMessagesInitial : ChatMessageType[] = [];

export const chatRoomMessagesState = atom<ChatMessageType[]>({
  key: "chatRoomMessagesState",
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
    id:"-1",
    name:"",
    description: "",
    users:[],
    owner: "",
    type: "channel"
  }
})

export const webSocketState = atom<WSManager>( {
  key: "webSocketState",
  default: undefined
})

export const roomsState = atom( {
  key: "roomsState",
  default: {
  }
})

export const chatRoomsState = atom<ChatRoomType[]>({
  key: "chatRoomsState",
  default: []
})

export const chatChannelRoomState = selector({
  key: "chatChannelRoomState",
  get: ({get}) => {
    const rooms = get(chatRoomsState);
    return rooms.filter( (room) =>  room.type === "channel")
  }
})

export const chatDirectMessageRoomState = selector({
  key: "chatDirectMessageRoomState",
  get: ({get}) => {
    const rooms = get(chatRoomsState);
    return rooms.filter( (room) =>  room.type === "directmessage")
  }
})