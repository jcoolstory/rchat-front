import { useRecoilState } from "recoil";
import styles from "./Chating.module.css";
import { settingViewPopupState } from "./uiState";
import { ChangeEvent, useMemo, useState } from "react";
import { userState } from "../../states/chatState";
import { UserType } from "../../types/user";

const SettingView = () => {
  const [showSettingView, setShowSettingView] = useRecoilState<boolean>(
    settingViewPopupState
  );

  const [user, setUser] = useRecoilState<UserType>(userState);
  const [id, setId] = useState(user.id);

  const className = useMemo(() => {
    if (showSettingView) return `${styles.userlist} ${styles.userlistshow}`;
    else return `${styles.userlist} ${styles.userlistoff}`;
  }, [showSettingView]);

  const handleCloseClick = () => {
    setShowSettingView(false);
  };

  const handleSaveClick = () => {
    setUser({ ...user,id });
    setShowSettingView(false);
  };

  const handleUserChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setId(event.target.value);
  };

  return (
    <div className={className}>
      <div className={styles.userlisttop}>
        <button onClick={handleCloseClick}>close</button>
      </div>
      <div>
        <input value={user.id} onChange={handleUserChange} />
      </div>
      <button onClick={handleSaveClick}>저장</button>
    </div>
  );
};

export default SettingView;
