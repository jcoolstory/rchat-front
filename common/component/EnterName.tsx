import { useRecoilState } from "recoil";
import styles from "./Chating.module.css";
import { showEnterNamePopupState } from "./uiState";
import { UserType } from "../../types/user";
import { userState } from "../../states/chatState";
import { useEffect, useState } from "react";

export const EnterNamePopup = () => {
  const [show, setShow] = useRecoilState(showEnterNamePopupState);
  const [user, setUser] = useRecoilState<UserType>(userState);
  const [id, setId] = useState(user.id);

  useEffect( () => {
    if (!user.id) {
      setShow(true)
    }
  }, [])

  const handleSaveClick = () => {
    setUser({ ...user,id });
    console.log(id)
    setShow(false);
  };

  if (!show) return null;
  else
    return (
      <div className={styles.layerPopup1}>
        <div className={styles.dim}>
          <div className={styles.popup}>
            <div className={styles.popupcontent}>
              <div className={styles.header}>정보 입력이 필요합니다.</div>
              <input type="text" placeholder="ID" onChange={(e) => setId(e.target.value)}></input>
              <div className={styles.footer}>
                <button onClick={handleSaveClick}>확인</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};
