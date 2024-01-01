import { useRecoilState, useRecoilValue } from "recoil";
import styles from "@styles/Chating.module.css";
import { createChatViewPopupState } from "../uiState";
import { useState } from "react";
import axios from "axios";
import { userState } from "../../../states/chatState";


const CreateChatRoom = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState("");
  const user = useRecoilValue(userState);


  const [showDirectMessage, setShowDirectMessage] = useRecoilState<boolean>(
    createChatViewPopupState
  );

  const handleCreateClick = () => {
    setShowDirectMessage(false);
    const userArr = users.split(",");
    const response = axios.post("http://127.0.0.1:8000/api/chatroom", {
        name: name,
        description,
        owner: user.id,
        users: userArr
    })
  };

  if (!showDirectMessage) return null;
  return (
    <div className={styles.layerPopup1}>
      <div className={styles.dim}>
        <div className={styles.popup}>
          <div className={styles.popupcontent}>
            <input
              type="text"
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="설명"
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="users"
              onChange={(e) => setUsers(e.target.value)}
            />
            <div className={styles.footer}>
              <button onClick={handleCreateClick}>전송</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateChatRoom;
