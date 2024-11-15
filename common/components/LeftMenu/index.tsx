import { useRecoilValue, useSetRecoilState } from "recoil";
import CreateChatRoom from "../chat/CreateChatRoom";
import styles from "@styles/Chating.module.css";
import {
  loadId, settingViewPopupState,
} from "../uiState";
import {
  userState,
} from "states/chatState";
import { useEffect, useState } from "react";
import CreateDirectMessageView from "../chat/CreateDirectMessageView";
import DirectMessageList from "./DirectMessageList";
import ChannelList from "./ChannelList";
import { BsGear } from "react-icons/bs";
import Button from "@components/Button";

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
  const setShowSettingView = useSetRecoilState<boolean>(
    settingViewPopupState
  );

  const handleSettingClick = () => {
    setShowSettingView(true);
  };
  

  return (
    <div className={styles.left}>
      <div className={styles.leftLabel}>
        <div className={styles.leftHome}>RChat</div>
        <div className={styles.userInfo}>
          <UserInfo />
          <Button  onClick={handleSettingClick}><BsGear/></Button>
        </div>
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
