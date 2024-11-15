import Button from "@components/Button";
import { createChatViewPopupState } from "@components/uiState";
import styles from "@styles/Chating.module.css";
import Link from "next/link";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  chatChannelRoomState,
  chatRoomInformationState,
} from "states/chatState";
import { ChatRoomType } from "types/chat";

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
          <div># {room.name}</div>
        </li>
      </Link>
    );
  }
);
const ChannelList = () => {
  const channelRooms = useRecoilValue(chatChannelRoomState);
  const roomData = useRecoilValue(chatRoomInformationState);

  const setShowCreateChat = useSetRecoilState(createChatViewPopupState);
  const handleCreateClick = () => {
    setShowCreateChat(true);
  };

  return (
    <>
      <div className={styles.leftGroupTitle}>
        Channel
        <Button onClick={handleCreateClick}>+</Button>
      </div>
      <ul className={styles.leftList}>
        {channelRooms.map((room: ChatRoomType) => (
          <Item key={room._id} room={room} active={room._id === roomData._id} />
        ))}
      </ul>
      <hr />
    </>
  );
};

export default ChannelList;
