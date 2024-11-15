import { useRecoilState, useRecoilValue } from "recoil";
import styles from "@styles/Chating.module.css";
import { directMessageViewPopupState } from "../uiState";
import { useState } from "react";
import axios from "axios";
import { userState } from "states/chatState";
import { useRouter } from "next/router";
import { UserType } from "types/user";
import { useMutation } from "@tanstack/react-query";
import { Button, FormControl, TextField } from "@mui/material";

const createDirectMessageRoom = async (user: UserType, to: string) => {
  const response = await axios.post("http://127.0.0.1:8000/api/chatroom", {
    name: `${user.id},${to}`,
    description: "",
    owner: user.id,
    users: [to],
    type: "directmessage",
  });
  return response;
};

const CreateDirectMessageView = () => {
  const [to, setTo] = useState("");
  const router = useRouter();
  const user = useRecoilValue(userState);
  const [showDirectMessage, setShowDirectMessage] = useRecoilState<boolean>(
    directMessageViewPopupState
  );

  const { mutate, isError, error, isSuccess } = useMutation({
    mutationFn: async () => {
      return await createDirectMessageRoom(user, to);
    },
    onSuccess: (response, variables, context) => {
      const { id } = response.data;
      router.push(`/wsroom/${id}`);
    },
  });

  const handleClickSend = async () => {
    setShowDirectMessage(false);
    mutate();
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
          <h3>Create DirectMessage</h3>
          <FormControl fullWidth sx={{ my: 1 }}>
            <TextField
              size="small"
              type="text"
              placeholder="ID"
              onChange={(e) => setTo(e.target.value)}
            />
          </FormControl>
          <div className={styles.footer}>
            <Button onClick={handleClickSend}>Create</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDirectMessageView;
