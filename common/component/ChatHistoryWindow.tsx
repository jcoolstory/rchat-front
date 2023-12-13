import { useRecoilValue } from "recoil";
import { chatRoomMessagesState, userState } from "../../states/chatState";
import styles from "./Chating.module.css";
import { useEffect, useMemo, useRef } from "react";
import { MessageType } from "../../types/chat";

const MessageBalloon = ({
  message,
  isSelf,
}: {
  message: MessageType;
  isSelf: boolean;
}) => {
    
  return (<>
    {
       isSelf ? <SelfMessageBalloon message={message}/> : <OtherMessageBallon message={message} />
    }
    </>);
};

const SelfMessageBalloon = ({message}: {
    message: MessageType;
  }) => {

    return (
        <div className={styles.selfmessage}>
      <div className={styles.ballon}>{message.message}</div>
    </div>
    );
}

const OtherMessageBallon = ({ message }: { message: MessageType }) => {
    const profileName = useMemo( () => {
        return message.from.slice(0,2).toUpperCase()
    }, [message])
  return (
    <div className={styles.message}>
      <div className={styles.profile}>{profileName}</div>
      <div className={styles.othermessage}>
        <div className={styles.name}>{message.from}</div>
        <div className={styles.ballon}>{message.message}</div>
      </div>
    </div>
  );
};

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
      {chatMessages.map((v, i) => (
        <MessageBalloon message={v} key={i} isSelf={user.id === v.from} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatHistoryWindow;
