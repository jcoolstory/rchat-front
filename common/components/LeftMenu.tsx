import { useRecoilValue, useSetRecoilState } from "recoil";
import { ChatRoomType } from "../../types/chat";
import CreateChatRoom from "./chat/CreateChatRoom";
import DirectMessageView from "./chat/DirectMessageView";
import styles from "@styles/Chating.module.css";
import {
  directMessageViewPopupState,
  createChatViewPopupState,
  loadId,
} from "./uiState";
import { Button } from "@mui/material";
import { userState } from "states/chatState";
import { useEffect, useState } from "react";

const UserInfo = () => {
  const [id, setId] = useState("");
  useEffect(() => {
    const id = loadId();
    setId(id);
  }, []);

  const userInfo = useRecoilValue(userState);
  return <div>{id}</div>;
};

const directMessages: ChatRoomType[] = [];
const LeftMenu = ({ rooms }: { rooms: ChatRoomType[] }) => {
  const setShowDirectMessage = useSetRecoilState(directMessageViewPopupState);
  const setShowCreateChat = useSetRecoilState(createChatViewPopupState);
  const handleClick = () => {
    setShowDirectMessage(true);
  };

  const handleCreateClick = () => {
    setShowCreateChat(true);
  };

  return (
    <div className={styles.left}>
      <div className={styles.leftLabel}>
        <div className={styles.leftHome}>RChat</div>
        <UserInfo />
      </div>
      <hr />
      <div className={styles.leftGroupTitle}>
        Channel
        <div onClick={handleCreateClick}>+</div>
      </div>
      <ul className={styles.leftList}>
        {rooms.map((room: ChatRoomType) => {
          return (
            <li className={styles.leftGroupItem} key={room.id}>
              <a href={`/wsroom/${room._id}`}>{room.name}</a>
            </li>
          );
        })}
      </ul>
      <hr />
      <div className={styles.leftGroupTitle}>
        다이렉트 메세지 <div onClick={handleClick}>+</div>
      </div>
      <ul className={styles.leftList}>
        {directMessages.map((room: ChatRoomType) => {
          return (
            <li className={styles.leftGroupItem} key={room.id}>
              <a href={`/wsroom/${room._id}`}>{room.name}</a>
            </li>
          );
        })}
      </ul>
      <DirectMessageView />
      <CreateChatRoom />
    </div>
  );
};

export default LeftMenu;
