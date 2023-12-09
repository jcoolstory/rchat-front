// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ChatRoom, rooms } from "./model/chat";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatRoom[]>
) {
  res.status(200).json(rooms);
}
