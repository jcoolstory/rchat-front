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
  // {
  //   id: "0",
  //   name: "기본방",
  //   description:
  //     "preset-env에 targets property를 사용하면 특정 브라우저에서만 해당 preset이 적용되도록 할 수 있다.",
  //   owner: "me",
  //   users: ["sdf", "me"],
  // },
  // {
  //   id: "1",
  //   name: "기본방1",
  //   description:
  //     "preset-env에 targets property를 사용하면 특정 브라우저에서만 해당 preset이 적용되도록 할 수 있다.",
  //   owner: "me",
  //   users: ["sdf", "me"],
  // },
  // {
  //   id: "3",
  //   name: "기본방2",
  //   description:
  //     "preset-env에 targets property를 사용하면 특정 브라우저에서만 해당 preset이 적용되도록 할 수 있다.",
  //   owner: "me",
  //   users: ["sdf", "me"],
  // }
];
