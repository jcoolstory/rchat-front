import { useRecoilState, useRecoilValue } from "recoil";
import styles from "@styles/Chating.module.css";
import { directMessageViewPopupState } from "../uiState";
import { ChangeEvent, useMemo, useState } from "react";
import { wsm } from "../../model/chat";
import axios from "axios";
import { userState } from "states/chatState";

const DirectMessageView = () => {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const user = useRecoilValue(userState);
  const [showDirectMessage, setShowDirectMessage] = useRecoilState<boolean>(
    directMessageViewPopupState
  );

  const handleClickSend = () => {
    setShowDirectMessage(false);
    const response = axios.post("http://127.0.0.1:8000/api/chatroom", {
      name: `${user.id},${to}`,
      description:"",
      owner: user.id,
      users: [to],
      type: "directmessage"
  })

  const newMessage = {
    to,
    message,
  };
    wsm.sendDirectMessage(newMessage);
  };

  if (!showDirectMessage) return null;
  return (
    <div className={styles.layerPopup1}>
      <div className={styles.dim}>
        <div className={styles.popup}>
          <div className={styles.popupcontent}>
            <input
              type="text"
              placeholder="ID"
              onChange={(e) => setTo(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="message"
              onChange={(e) => setMessage(e.target.value)}
            ></input>
            <div className={styles.footer}>
              <button onClick={handleClickSend}>전송</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectMessageView;
