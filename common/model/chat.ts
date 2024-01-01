import { ChatRoomType, ChatMessageType, TrDataType, TrType, InputChatMessageType } from "../../types/chat";

export type PayloadPollingMessage = {
};

export type PayloadSendMessage = {
  message: ChatMessageType | InputChatMessageType;
} & PayloadPollingMessage;

export const chatHistory: any = {
  0: [
    {
      index: 0,
      timestamp: Date.now(),
      from: "sdf",
      message: "sdfhello",
    },
    {
      index: 1,
      timestamp: Date.now(),
      from: "me",
      message: "mehello",
    },
    {
      index: 2,
      timestamp: Date.now(),
      from: "sdf",
      message: "sdfhdsello",
    },
  ],
};

export const rooms: ChatRoomType[] = [
  {
    id: "0",
    name: "기본방",
    description:
      "preset-env에 targets property를 사용하면 특정 브라우저에서만 해당 preset이 적용되도록 할 수 있다.",
    owner: "me",
    users: ["sdf", "me"],
  },
  {
    id: "1",
    name: "기본방1",
    description:
      "preset-env에 targets property를 사용하면 특정 브라우저에서만 해당 preset이 적용되도록 할 수 있다.",
    owner: "me",
    users: ["sdf", "me"],
  },
  {
    id: "3",
    name: "기본방2",
    description:
      "preset-env에 targets property를 사용하면 특정 브라우저에서만 해당 preset이 적용되도록 할 수 있다.",
    owner: "me",
    users: ["sdf", "me"],
  }
];

type ReceiveCallback  =  (data:TrDataType) => void

export class WSManager {
  private session: WebSocket | null = null;
  private receiveHandlers: ReceiveCallback[] = [];

  constructor() {}

  connect(url: string, id: string) {
    const ws = new WebSocket(url);
    this.session = ws;
    ws.onopen = (event) => {
      this.sendCommand({cmd: "connect", id})
    };

    // recieve message every start page
    ws.onmessage = (e: MessageEvent) => {
      const message = JSON.parse(e.data);
      this.receiveMessage(message);
    };
    return this.session;
  }

  sendMessage(message: string | any) {
    this.session?.send(JSON.stringify(this.createChatMessage(message)));
  }

  sendDirectMessage(message: string| any) {
    this.session?.send(JSON.stringify(this.createDirectMessage(message)));
  }

  receiveMessage(message: any) {
    this.receiveHandlers.forEach((cb: Function) => {
      cb(message);
    });
  }

  onReceive(callback: ReceiveCallback) {
    this.receiveHandlers.push(callback);
  }

  onRemoveReceive(callback:any) {
    const index = this.receiveHandlers.findIndex(callback);
    this.receiveHandlers.splice(index,1);
  }

  close() {
    this.receiveHandlers = [];
    this.session?.close();
  }

  createChatMessage(message: any): TrDataType {
    return {
      type: TrType.chatroom,
      subType: "",
      content: message,
    };
  }

  createDirectMessage(message: any) : TrDataType {
    return {
      type: TrType.private_message,
      subType: "",
      content: message
    }
  }

  sendCommand(message: string| any) {
    this.session?.send(
      JSON.stringify({
        type: "cmd",
        subType: "",
        content: message,
      })
    );
  }
}


export let wsm : WSManager = new WSManager();