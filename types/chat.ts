export type ChatRoomType = {
  id: string;
  _id?: string;
  name: string;
  description: string;
  users?: string[];
  owner: string;
  type: "channel" | "directmessage"
};

export type ChatMessageType = {
  _id?: string;
  roomId?: string;
  timestamp?: number;
  sender: string;
  to?: string;
  type?: string;
  message: string;
};

export type InputChatMessageType = {
  roomId: string;
  timestamp?: number;
  sender?: string;
  to?: string;
  message: string;
};

export type TrDataType = {
  type: string;
  subType: string;
  content: ChatMessageType | string | any;
};

export const TrType = {
  chatroom: "chatroom",
  cmd: "cmd",
  enter: "enter_room",
  exit: "exit_room",
  direct_message: "dm",
};
