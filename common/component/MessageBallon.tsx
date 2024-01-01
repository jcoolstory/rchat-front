import React from "react";
import { useMemo } from "react";
import { ChatMessageType } from "../../types/chat";
import styles from "./Chating.module.css";

const MessageBalloon = ({
  message,
  isSelf,
}: {
  message: ChatMessageType;
  isSelf: boolean;
}) => {
  return (
    <>
      {isSelf ? (
        <SelfMessageBalloon message={message} />
      ) : (
        <OtherMessageBallon message={message} />
      )}
    </>
  );
};

const SelfMessageBalloon = ({ message }: { message: ChatMessageType }) => {
  return (
    <div className={styles.selfmessage}>
      <div className={styles.ballon}>{message.message}</div>
    </div>
  );
};

const OtherMessageBallon = ({ message }: { message: ChatMessageType }) => {
  const profileName = useMemo(() => {
    return message.sender.slice(0, 2).toUpperCase();
  }, [message]);
  return (
    <div className={styles.message}>
      <div className={styles.profile}>{profileName}</div>
      <div className={styles.othermessage}>
        <div className={styles.name}>{message.sender}</div>
        <div className={styles.ballon}>{message.message}</div>
      </div>
    </div>
  );
};

export default React.memo(MessageBalloon);