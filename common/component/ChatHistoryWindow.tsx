import { useRecoilValue } from "recoil";
import { chatRoomMessagesState, userState } from "../../states/chatState";
import styles from "./Chating.module.css";
import { useEffect, useMemo, useRef } from "react";
import MessageBalloon from "./MessageBallon";

const ChatHistoryWindow = () => {
  const chatMessages = useRecoilValue(chatRoomMessagesState);
  const user = useRecoilValue(userState);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);
  
  const scrollToBottom = () => {
    if (bottomRef.current)
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className={styles.chatwindow}>
      {chatMessages && chatMessages.map((v) => (
        <MessageBalloon message={v} key={v._id} isSelf={user.id === v.sender} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatHistoryWindow;
