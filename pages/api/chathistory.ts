// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { chatHistory } from "../../common/model/chat";
import { ChatRoomType } from "../../types/chat";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatRoomType | any>
) {
  const { id } = req.query;
  if (typeof id === "string" && chatHistory[id]) {
    const history = chatHistory[id];
    res.status(200).json(history);
  } else {
    res.status(200).json([]);
  }
}
