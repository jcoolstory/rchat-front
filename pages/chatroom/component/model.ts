import { Message } from "../../api/model/chat";

export const createMesage = ({
  id,
  message,
}: {
  id: string;
  message: string;
}) : Message  => {
  return {
    index: 0,
    from: id,
    message: message,
  };
};
