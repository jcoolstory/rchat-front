import type { NextPageContext } from "next";
import Head from "next/head";
import ChatInput from "../../common/component/ChatInput";
import ChatHistoryWindow from "../../common/component/ChatHistoryWindow";
import { ReactElement, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  chatRoomInformationState,
  chatRoomMessagesState,
  userState,
} from "../../states/chatState";
import {
  ChatRoomType,
  ChatMessageType,
  TrDataType,
  TrType,
} from "../../types/chat";
import { Navigation } from "../../common/component/Navigation";
import ChatUserList from "../../common/component/ChatUserList";
import { useSockChat } from "../../common/hooks/useSockChat";
import SettingView from "../../common/component/SettingView";
import styles from "../../common/component/Chating.module.css";
import LeftMenu from "../../common/component/LeftMenu";
import { wsm } from "../../common/model/chat";
import { NextPageWithLayout } from "../_app";
import { loadId, showEnterNamePopupState } from "../../common/component/uiState";
import { EnterNamePopup } from "../../common/component/EnterName";
import { createMesage } from "../../common/component/model";

type ChatRoomPageProps = {
  rooms: ChatRoomType[];
  roomData: ChatRoomType;
  chatHistory: ChatMessageType[];
};

const ChatRoomPage: NextPageWithLayout<ChatRoomPageProps> = ({
  rooms,
  roomData,
  chatHistory,
}) => {
  const setRoomInformation = useSetRecoilState(chatRoomInformationState);
  const setChatMessages = useSetRecoilState(chatRoomMessagesState);
  const receiveMessage = (data: TrDataType) => {
    if (data.type === TrType.private_message) {
      alert(data.content.message);
    }
  };

  useEffect(() => {
    setChatMessages(chatHistory);
    setRoomInformation(roomData);
    wsm.onReceive(receiveMessage);

  }, []);

  const { sendMessage } = useSockChat(roomData);

  const handleMessage = async (message: string) => {
    const send = createMesage({roomId: roomData.id,  id:"", message:message})
    await sendMessage(send);
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.main}>
          <LeftMenu rooms={rooms} />
          <div className={styles.dContainer}>
            <Navigation title={roomData.name} />
            <ChatHistoryWindow />
            <ChatInput sendMessage={handleMessage} />
          </div>
        </div>
      </main>
      <SettingView />
      <ChatUserList />
    </div>
  );
};

type WrapperProps = {
	children: React.ReactNode;
}

const Layout = ({ children }: WrapperProps) => {
  const [show, setShow] = useRecoilState(showEnterNamePopupState);
  const [user, setId] = useRecoilState(userState);

  useEffect(() => {
    const id = loadId();
    if (id) {
      setId( (prev)=> ({...prev, id}));
      setShow(false);
    } else {
      setShow(true);
    }
  }, [user.id]);

  if (!user.id) return <EnterNamePopup></EnterNamePopup>
  return <>{children}</>;
};

const NestedLayout = ({children}: WrapperProps) => {
  return <div>{children}</div>;
};

ChatRoomPage.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const id = ctx.query.id;
  const res = await fetch(`http://localhost:8000/api/chatroom/${id}`);
  const roomData = await res.json();
  const chatHistoryRes = await fetch(
    `http://localhost:8000/api/chatroom/${id}/history`
  );
  const chatHistory = await chatHistoryRes.json();
  const roomsRes = await fetch("http://127.0.0.1:8000/api/chatroom");
  const rooms = await roomsRes.json();

  return { props: { rooms, roomData, chatHistory: chatHistory.data } };
};

export default ChatRoomPage;