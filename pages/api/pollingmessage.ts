// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { chatHistory, PayloadSendMessage } from "../../common/model/chat";
import { ChatRoomType } from "../../types/chat";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatRoomType|any>
) {
    const body: PayloadSendMessage = req.body;
    const lastReadIndex = body.lastReadIndex;
    const pushMessages = getAddedMessage(body.roomId, lastReadIndex);
    res.status(200).json({result:"ok", updateData: pushMessages});
}

export const getAddedMessage = (roomId:number, lastReadIndex: number) : [] => {
  let pushMessages = []
  if (chatHistory[roomId]) 
    pushMessages = chatHistory[roomId].slice(lastReadIndex+1);
  return pushMessages;
}