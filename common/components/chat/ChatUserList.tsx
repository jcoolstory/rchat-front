import { useRecoilState, useRecoilValue } from "recoil";
import styles from "@styles/Chating.module.css";
import { chatUserListPopupState } from "../uiState";
import { useMemo } from "react";
import { chatRoomInformationState } from "../../../states/chatState";
import { BsX } from "react-icons/bs";
import Button from "@components/Button";

const ChatUserList = () => {
  const [showUserList, setShowUserList] = useRecoilState<boolean>(
    chatUserListPopupState
  );
  const chatRoomInforation = useRecoilValue(chatRoomInformationState);

  const handleCloseClick = () => {
    setShowUserList(false);
  };

  const className = useMemo(() => {
    if (showUserList) return `${styles.userlist} ${styles.userlistshow}`;
    else return `${styles.userlist} ${styles.userlistoff}`;
  }, [showUserList]);

  return (
    <div className={className}>
      <div className={styles.userlisttop}>
        <Button onClick={handleCloseClick}><BsX/></Button>
      </div>
      <div>
        <ul>
            {chatRoomInforation.users && chatRoomInforation.users.map( (v: string)=> {
                return <li key={v}>{v} </li>
            })}
        </ul>
      </div>
    </div>
  );
};

export default ChatUserList;
