export type ChatRoomType = {
  id: number;
  name: string;
  description: string;
  users?: string[];
  owner: string;
};

export type MessageType = {
  index: number;
  timestamp?: number;
  from: string;
  message: string;
};
