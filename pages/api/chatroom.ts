// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ChatRoom, rooms } from "./model/chat";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatRoom|any>
) {
  const { id } = req.query
  const findRoom = rooms.filter(v=> {
    return id === String(v.id)
  })

  if (findRoom.length == 0)
    res.status(200).json({});
  else
    res.status(200).json(findRoom[0]);
}
