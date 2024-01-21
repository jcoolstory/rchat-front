import { useRecoilState, useRecoilValue } from "recoil";
import styles from "@styles/Chating.module.css";
import { createChatViewPopupState } from "../uiState";
import { useState } from "react";
import axios from "axios";
import { userState } from "../../../states/chatState";
import { useRouter } from "next/router";


const CreateChatRoom = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState("");

  const router = useRouter();
  const user = useRecoilValue(userState);

  const [showDirectMessage, setShowDirectMessage] = useRecoilState<boolean>(
    createChatViewPopupState
  );

  const handleCreateClick = async () => {
    setShowDirectMessage(false);
    const userArr = users.split(",");
    const response = await axios.post("http://127.0.0.1:8000/api/chatroom", {
        name: name,
        description,
        owner: user.id,
        users: userArr,
        type: "channel"
    })

    if (response.status === 200) {
      const { id } = response.data;
      router.push(`/wsroom/${id}`);
    }
  };

  if (!showDirectMessage) return null;
  return (
    <div className={styles.layerPopup1}>
      <div className={styles.dim} onClick={()=>setShowDirectMessage(false)}>
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
