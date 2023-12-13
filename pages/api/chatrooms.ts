// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { rooms } from "../../common/model/chat";
import { ChatRoomType } from "../../types/chat";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatRoomType[]>
) {
  res.status(200).json(rooms);
}
