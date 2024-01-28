import { TrDataType, TrType } from "types/chat";

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
      type: TrType.direct_message,
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