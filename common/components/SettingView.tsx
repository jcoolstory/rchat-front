import { useRecoilState } from "recoil";
import styles from "@styles/Chating.module.css";
import { loadId, saveId, settingViewPopupState } from "./uiState";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { userState } from "../../states/chatState";
import { UserType } from "../../types/user";

const SettingView = () => {
  const [showSettingView, setShowSettingView] = useRecoilState<boolean>(
    settingViewPopupState
  );

  const [user, setUser] = useRecoilState<UserType>(userState);
  const [id, setId] = useState("");

  useEffect( ()=> {
    const id = loadId();
    if (id) {
      setId(id);
    }
  },[])

  const className = useMemo(() => {
    if (showSettingView) return `${styles.userlist} ${styles.userlistshow}`;
    else return `${styles.userlist} ${styles.userlistoff}`;
  }, [showSettingView]);

  const handleCloseClick = () => {
    setShowSettingView(false);
  };

  const handleSaveClick = () => {
    saveId(id);
    setUser({ ...user,id });
    setShowSettingView(false);
  };

  const handleUserChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setId(event.target.value);
  };

  const handleClickLogout = () => {
    saveId("");
    setUser({ ...user,id:""});
  }

  return (
    <div className={className}>
      <div className={styles.userlisttop}>
        <button onClick={handleCloseClick}>close</button>
      </div>
      <div>
        <input value={id} onChange={handleUserChange} />
      </div>
      <button onClick={handleSaveClick}>저장</button>
      <button onClick={handleClickLogout}>logout</button>
    </div>
  );
};

export default SettingView;
