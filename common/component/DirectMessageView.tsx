import { useRecoilState } from "recoil";
import styles from "./Chating.module.css";
import { directMessageViewPopupState } from "./uiState";
import { ChangeEvent, useMemo, useState } from "react";
import { wsm } from "../model/chat";

const DirectMessageView = () => {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");

  const [showDirectMessage, setShowDirectMessage] = useRecoilState<boolean>(
    directMessageViewPopupState
  );

  const handleClickSend = () => {
    setShowDirectMessage(false);
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
