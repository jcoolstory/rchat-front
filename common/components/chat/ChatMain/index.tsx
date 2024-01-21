import { useSockChat } from "../../../hooks/useSockChat";
import { Navigation } from "../../Navigation";
import ChatHistoryWindow from "../ChatHistoryWindow";
import ChatInput from "../ChatInput";

import styles from "@styles/Chating.module.css";
import { ChatRoomType } from "../../../../types/chat";
import { useHistoryHooks } from "./hooks";
import OverlayLoadingBar from "@components/OverlayLoadingBar";

const ChatMain = ({ roomData }: { roomData: ChatRoomType }) => {
  const { sendMessage } = useSockChat(roomData);

  const {isLoading} = useHistoryHooks(roomData);
  const handleMessage = async (message: string) => {
    await sendMessage({
      roomId: roomData.id,
      message: message,
    });
  };

  return (
    <div className={styles.dContainer}>
      <Navigation title={roomData.name} />
      <ChatHistoryWindow />
      {isLoading && <OverlayLoadingBar />} 
      <ChatInput sendMessage={handleMessage} />
    </div>
  );
};

export default ChatMain;
