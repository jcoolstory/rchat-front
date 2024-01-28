import styles from "@styles/Chating.module.css";
import { BsArrowLeft } from "react-icons/bs";
// import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { BsGear } from "react-icons/bs";
import { useSetRecoilState } from "recoil";
import { chatUserListPopupState, settingViewPopupState } from "./uiState";
import Router from 'next/router'
import Button from "./Button";

const RightMenu = () => {
  const setShowUserList = useSetRecoilState<boolean>(chatUserListPopupState);
  const handleUserListClick = () => {
    setShowUserList(true);
  };

  return (
      <Button>
        <BsFillQuestionCircleFill onClick={handleUserListClick} /> 
      </Button>
  );
};

export const Navigation = ({title=""} : {title?:string}) => {
  const handleHistoryBack = () => {
    Router.back();
  }
  return (
    <div className={styles.nav}>
      <div>{title}</div><RightMenu  />
    </div>
  );
};
