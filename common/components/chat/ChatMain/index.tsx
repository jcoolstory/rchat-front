import { useSockChat } from "../../../hooks/useSockChat";
import { Navigation } from "../../Navigation";
import ChatHistoryWindow from "../ChatHistoryWindow";
import ChatInput from "../ChatInput";

import styles from "@styles/Chating.module.css";
import { ChatRoomType } from "../../../../types/chat";
import { useHistoryHooks } from "./hooks";
import OverlayLoadingBar from "@components/OverlayLoadingBar";
import InputMessage from "../InputMessage";
import { useSetRecoilState } from "recoil";
import { chatRoomMessagesState } from "states/chatState";

const ChatMain = ({ roomData }: { roomData: ChatRoomType }) => {
  const { sendMessage } = useSockChat(roomData);
  const setChatMessages = useSetRecoilState(chatRoomMessagesState);

  const { isLoading } = useHistoryHooks(roomData);
  const handleMessage = async (message: string) => {
    const result = InputMessage.handler(message);
    if (result.pass) {
      if (result.type === "component") {
        const localMessage = {
          roomId: roomData.id,
          sender: "",
          message: message,
          type: "command"
        }
        setChatMessages( (prev) => ([...prev, localMessage]));
      }

    } else {
      await sendMessage({
        roomId: roomData.id,
        message: message,
      });
    }
  };

  return (
    <div className={styles.dContainer}>
      <Navigation title={roomData.name} />
      <ChatHistoryWindow />
      { <OverlayLoadingBar />}
      <ChatInput sendMessage={handleMessage} />
    </div>
  );
};

export default ChatMain;
