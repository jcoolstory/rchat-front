import { useRecoilState, useRecoilValue } from "recoil";
import styles from "@styles/Chating.module.css";
import { chatUserListPopupState } from "../uiState";
import { useMemo } from "react";
import { chatRoomInformationState } from "../../../states/chatState";

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
        <button onClick={handleCloseClick}>close</button>
      </div>
      <div>
        <ul>
            {chatRoomInforation.users && chatRoomInforation.users.map( (v: string)=> {
                return <li>{v} </li>
            })}
        </ul>
      </div>
    </div>
  );
};

export default ChatUserList;
