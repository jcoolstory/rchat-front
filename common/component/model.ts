import { ChatMessageType } from "../../types/chat";

export const createMesage = ({
  roomId,
  id,
  message,
}: {
  roomId:string,
  id: string;
  message: string;
}) : ChatMessageType  => {
  return {
    roomId: roomId,
    sender: id,
    message: message,
  };
};
