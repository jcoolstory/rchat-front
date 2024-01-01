import styles from "@styles/Chating.module.css";
import { BsArrowLeft } from "react-icons/bs";
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
import { BsGear } from "react-icons/bs";
import { useSetRecoilState } from "recoil";
import { chatUserListPopupState, settingViewPopupState } from "./uiState";
import Router from 'next/router'

const RightMenu = () => {
  const setShowUserList = useSetRecoilState<boolean>(chatUserListPopupState);
  const setShowSettingView = useSetRecoilState<boolean>(
    settingViewPopupState
  );

  const handleUserListClick = () => {
    setShowUserList(true);
  };

  const handleSettingClick = () => {
    setShowSettingView(true);
  };
  
  return (
    <>
      <div>
        <BsFillFileEarmarkPersonFill onClick={handleUserListClick} /> 
        <BsGear onClick={handleSettingClick}/>
      </div>
    </>
  );
};

export const Navigation = ({title=""} : {title?:string}) => {
  const handleHistoryBack = () => {
    Router.back();
  }
  return (
    <div className={styles.nav}>
      <div><BsArrowLeft onClick={handleHistoryBack}/> {title}</div><RightMenu  />
    </div>
  );
};
