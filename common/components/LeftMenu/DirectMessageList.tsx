import { directMessageViewPopupState } from "@components/uiState";
import Link from "next/link";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  chatDirectMessageRoomState,
  chatRoomInformationState,
} from "states/chatState";
import { ChatRoomType } from "types/chat";
import styles from "@styles/Chating.module.css";
import React from "react";

const Item = React.memo(
  ({ room, active }: { room: ChatRoomType; active: boolean }) => {
    return (
      <Link href={`/wsroom/${room._id}`}>
        <li
          className={[styles.leftGroupItem, active ? styles.active : null].join(
            " "
          )}
          key={room.id}
        >
          <div className={styles.leftDmItem}></div>
          <div>{room.name}</div>
        </li>
      </Link>
    );
  }
);

const DirectMessageList = () => {
  const directMessages = useRecoilValue(chatDirectMessageRoomState);
  const setShowDirectMessage = useSetRecoilState(directMessageViewPopupState);

  const roomData = useRecoilValue(chatRoomInformationState);

  const handleClick = () => {
    setShowDirectMessage(true);
  };

  return (
    <>
      <div className={styles.leftGroupTitle}>
        다이렉트 메세지 <div onClick={handleClick}>+</div>
      </div>
      <ul className={styles.leftList}>
        {directMessages.map((room: ChatRoomType) => (
          <Item key={room._id} room={room} active={roomData._id === room._id} />
        ))}
      </ul>
    </>
  );
};

export default DirectMessageList;
