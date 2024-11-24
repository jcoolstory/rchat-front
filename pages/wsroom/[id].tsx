import type { NextPageContext } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import {
  chatRoomInformationState,
  chatRoomsState,
} from "../../states/chatState";
import { ChatRoomType, TrDataType, TrType } from "../../types/chat";
import SettingView from "@components/SettingView";
import styles from "@styles/Chating.module.css";
import LeftMenu from "@components/LeftMenu";
import { wsm } from "../../common/model/WSManager";
import { NextPageWithLayout } from "../_app";
import ChatUserList from "@components/chat/ChatUserList";
import ChatMain from "@components/chat/ChatMain";
import axios from "axios";
import { getRoomList } from "../../common/api";

type ChatRoomPageProps = {
  rooms: ChatRoomType[];
  roomData: ChatRoomType;
};

const ChatRoomPage: NextPageWithLayout<ChatRoomPageProps> = ({
  rooms,
  roomData,
}) => {
  const setRoomInformation = useSetRecoilState(chatRoomInformationState);
  const setRooms = useSetRecoilState(chatRoomsState);
  const receiveMessage = (data: TrDataType) => {
    if (data.type === TrType.direct_message) {
      alert(data.content.message);
    }
  };

  useEffect(() => {
    wsm.onReceive(receiveMessage);
  }, []);

  useEffect(() => {
    setRoomInformation(roomData);
  }, [roomData]);

  useEffect(() => {
    setRooms(rooms);
  }, [rooms]);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.main}>
          <LeftMenu />
          <ChatMain roomData={roomData} />
        </div>
      </main>
      <SettingView />
      <ChatUserList />
    </div>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  if (ctx.req?.headers?.cookie) {
    let { cookie } = ctx.req?.headers;
    cookie = cookie || "";
  }

  let token = "";
  const headers = {
    Authorization: `Token ${token}`,
  };

  const id = ctx.query.id;
  const res = await axios(`http://localhost:8000/api/chatroom/${id}`, {
    headers,
  });
  const roomData = await res.data;
  const rooms = await getRoomList();
  return {
    props: {
      rooms,
      roomData: roomData.data,
    },
  };
};

export default ChatRoomPage;
