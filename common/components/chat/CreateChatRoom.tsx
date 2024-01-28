import { useRecoilState, useRecoilValue } from "recoil";
import styles from "@styles/Chating.module.css";
import { createChatViewPopupState } from "../uiState";
import { useState } from "react";
import axios from "axios";
import { userState } from "../../../states/chatState";
import { useRouter } from "next/router";
import { Button, FormControl, TextField } from "@mui/material";

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
      type: "channel",
    });

    if (response.status === 200) {
      const { id } = response.data;
      router.push(`/wsroom/${id}`);
    }
  };

  if (!showDirectMessage) return null;
  return (
    <div className={styles.layerPopup1}>
      <div
        className={styles.dim}
        onClick={() => setShowDirectMessage(false)}
      ></div>
      <div className={styles.popup}>
        <div className={styles.popupcontent}>
          <h3>Create Channel</h3>
          <FormControl fullWidth sx={{ my: 1 }}>
            <TextField
              size="small"
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth sx={{ my: 1 }}>
            <TextField
              size="small"
              placeholder="users"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <div className={styles.footer}>
            <Button onClick={handleCreateClick}>Create</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateChatRoom;
