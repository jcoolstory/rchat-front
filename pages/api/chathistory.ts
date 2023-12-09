// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ChatRoom, rooms, chatHistory } from "./model/chat";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatRoom|any>
) {
    
  const { id } = req.query
  if (typeof(id) === "string") {
    const history = chatHistory["0"];
    res.status(200).json(history);
  } else {
    res.status(200).json([]);
  }
}
