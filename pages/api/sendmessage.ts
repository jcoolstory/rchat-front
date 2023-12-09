// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ChatRoom, rooms, chatHistory, PayloadMessage } from "./model/chat";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatRoom|any>
) {
    const body: PayloadMessage = req.body;
    const lastReadIndex = body.lastReadIndex;
    const lastMessageCount = chatHistory[body.roomId].length;

    body.message.timestamp = Date.now();
    body.message.index = lastMessageCount;
    if (!chatHistory[body.roomId])
        chatHistory[body.roomId] = []    

    chatHistory[body.roomId].push(body.message);
    const pushMessages =  chatHistory[body.roomId].slice(lastReadIndex+1);
    res.status(200).json({result:"ok", data:body.message, updateData: pushMessages});
}
