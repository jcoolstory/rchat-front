import { ChatRoomType, MessageType } from "../../types/chat";


export type PayloadPollingMessage = {
  lastReadIndex: number,
  roomId: number,
}

export type PayloadSendMessage = {
  message: MessageType
} & PayloadPollingMessage

export const chatHistory : any = {
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
    }
  ]
}

export const rooms: ChatRoomType[] = [
  {
    id: 0,
    name: "기본방",
    description:
      "preset-env에 targets property를 사용하면 특정 브라우저에서만 해당 preset이 적용되도록 할 수 있다.",
    owner: "me",
    users: ["sdf", "me"]
  },
  {
    id: 1,
    name: "기본방1",
    description:
      "preset-env에 targets property를 사용하면 특정 브라우저에서만 해당 preset이 적용되도록 할 수 있다.",
      owner: "me",
      users: ["sdf", "me"]
  },
  {
    id: 3,
    name: "기본방2",
    description:
      "preset-env에 targets property를 사용하면 특정 브라우저에서만 해당 preset이 적용되도록 할 수 있다.",
      owner: "me",
      users: ["sdf", "me"]
  },
  {
    id: 5,
    name: "기본방3",
    description:
      "preset-env에 targets property를 사용하면 특정 브라우저에서만 해당 preset이 적용되도록 할 수 있다.",
      owner: "me",
      users: ["sdf", "me"]
  },
  {
    id: 6,
    name: "기본방4",
    description:
      "preset-env에 targets property를 사용하면 특정 브라우저에서만 해당 preset이 적용되도록 할 수 있다.",
      owner: "me",
      users: ["sdf", "me"]
  },
  {
    id: 7,
    name: "기본방5",
    description:
      "preset-env에 targets property를 사용하면 특정 브라우저에서만 해당 preset이 적용되도록 할 수 있다.",
      owner: "me",
      users: ["sdf", "me"]
  },
  {
    id: 9,
    name: "기본방7",
    description:
      "preset-env에 targets property를 사용하면 특정 브라우저에서만 해당 preset이 적용되도록 할 수 있다.",
      owner: "me",
      users: ["sdf", "me"]
  },
  {
    id: 11,
    name: "기본방8",
    description:
      "preset-env에 targets property를 사용하면 특정 브라우저에서만 해당 preset이 적용되도록 할 수 있다.",
      owner: "me",
      users: ["sdf", "me"]
  },
];
