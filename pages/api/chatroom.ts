// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { rooms } from "../../common/model/chat";
import { ChatRoomType } from "../../types/chat";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatRoomType|any>
) {
  const { id } = req.query;
  const findRoom = rooms.filter(v=> id === v.id);

  if (findRoom.length == 0)
    res.status(200).json({});
  else
    res.status(200).json(findRoom[0]);
}
