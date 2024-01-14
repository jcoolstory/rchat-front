import { EnterNamePopup } from "@components/EnterName";
import { showEnterNamePopupState, loadId } from "@components/uiState";
import { useEffect, ReactElement } from "react";
import { useRecoilState } from "recoil";
import { userState } from "states/chatState";
import ChatRoomPage from "./[id]";

type WrapperProps = {
    children: React.ReactNode;
  };
  
  const Layout = ({ children }: WrapperProps) => {
    const [show, setShow] = useRecoilState(showEnterNamePopupState);
    const [user, setId] = useRecoilState(userState);
  
    useEffect(() => {
      const id = loadId();
      if (id) {
        setId((prev) => ({ ...prev, id }));
        setShow(false);
      } else {
        setShow(true);
      }
    }, [user.id]);
  
    if (!user.id) return <EnterNamePopup></EnterNamePopup>;
    return <>{children}</>;
  };
  
  const NestedLayout = ({ children }: WrapperProps) => {
    return <div>{children}</div>;
  };
  
  ChatRoomPage.getLayout = (page: ReactElement) => {
    return (
      <Layout>
        <NestedLayout>{page}</NestedLayout>
      </Layout>
    );
  };
  