import { useRecoilValue } from "recoil";
import { chatRoomMessagesState, userState } from "../../../states/chatState";
import styles from "@styles/Chating.module.css";
import { useEffect, useMemo, useRef } from "react";
import MessageBalloon from "./MessageBallon";
import { renderCommand } from "./InputMessage";

const ChatHistoryWindow = () => {
  const chatMessages = useRecoilValue(chatRoomMessagesState);
  const user = useRecoilValue(userState);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    if (bottomRef.current) bottomRef.current.scrollIntoView();
  };

  return (
    <div className={styles.chatwindow}>
      {chatMessages &&
        chatMessages.map((v) => {
          if (!v.type) {
            return (
              <MessageBalloon
                message={v}
                key={v._id}
                isSelf={user.id === v.sender}
              />
            );
          } else {
            return renderCommand(v.message)
          }
        })}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatHistoryWindow;
