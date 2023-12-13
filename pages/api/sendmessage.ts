// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getAddedMessage } from "./pollingmessage";
import { ChatRoomType } from "../../types/chat";
import { PayloadSendMessage, chatHistory } from "../../common/model/chat";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatRoomType|any>
) {
    const body: PayloadSendMessage = req.body;
    const lastReadIndex = body.lastReadIndex;
    let lastMessageCount = 0;
    if (chatHistory[body.roomId])
        lastMessageCount = chatHistory[body.roomId].length;
        
    body.message.timestamp = Date.now();
    body.message.index = lastMessageCount;
    if (!chatHistory[body.roomId])
        chatHistory[body.roomId] = []

    chatHistory[body.roomId].push(body.message);
    const pushMessages = getAddedMessage(body.roomId, lastReadIndex);
    res.status(200).json({result:"ok", data:body.message, updateData: pushMessages});
}
