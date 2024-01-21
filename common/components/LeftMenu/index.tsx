import { useRecoilValue, useSetRecoilState } from "recoil";
import CreateChatRoom from "../chat/CreateChatRoom";
import styles from "@styles/Chating.module.css";
import {
  loadId,
} from "../uiState";
import {
  userState,
} from "states/chatState";
import { useEffect, useState } from "react";
import CreateDirectMessageView from "../chat/CreateDirectMessageView";
import DirectMessageList from "./DirectMessageList";
import ChannelList from "./ChannelList";

const UserInfo = () => {
  const [id, setId] = useState("");
  useEffect(() => {
    const id = loadId();
    setId(id);
  }, []);

  const userInfo = useRecoilValue(userState);
  return <div>{id}</div>;
};

const LeftMenu = () => {
  return (
    <div className={styles.left}>
      <div className={styles.leftLabel}>
        <div className={styles.leftHome}>RChat</div>
        <UserInfo />
      </div>
      <hr />
      <ChannelList />
      <DirectMessageList />
      <CreateDirectMessageView />
      <CreateChatRoom />
    </div>
  );
};

export default LeftMenu;
