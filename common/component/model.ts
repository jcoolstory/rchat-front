import { MessageType } from "../../types/chat";

export const createMesage = ({
  id,
  message,
}: {
  id: string;
  message: string;
}) : MessageType  => {
  return {
    index: 0,
    from: id,
    message: message,
  };
};
