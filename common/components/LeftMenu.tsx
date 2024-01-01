import { useSetRecoilState } from "recoil";
import { ChatRoomType } from "../../types/chat";
import CreateChatRoom from "./chat/CreateChatRoom";
import DirectMessageView from "./chat/DirectMessageView";
import styles from "@styles/Chating.module.css";
import {
  directMessageViewPopupState,
  createChatViewPopupState,
} from "./uiState";

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
      <div>RChat</div>
      <ul>
        {rooms.map((room: ChatRoomType) => {
          return (
            <li key={room.id}>
              <a href={`/wsroom/${room._id}`}>{room.name}</a>
            </li>
          );
        })}
      </ul>
      <hr />
      <div>
        <button onClick={handleClick}>direct message</button>
      </div>
      <div>
        <button onClick={handleCreateClick}>create message</button>
      </div>
      <DirectMessageView />
      <CreateChatRoom />
    </div>
  );
};

export default LeftMenu;
