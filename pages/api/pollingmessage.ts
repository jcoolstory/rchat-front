// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ChatRoom, rooms, chatHistory, PayloadMessage } from "./model/chat";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatRoom|any>
) {
    const body: PayloadMessage = req.body;
    const lastReadIndex = body.lastReadIndex;
    const pushMessages =  chatHistory[body.roomId].slice(lastReadIndex+1);
    res.status(200).json({result:"ok", updateData: pushMessages});
}
