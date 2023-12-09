import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import styles from "../../styles/Chat.module.css";
import { ChatRoom, Message, PayloadMessage } from "../api/model/chat";
import ChatInput from "./component/ChatInput";
import ChatHistoryWindow from "./component/ChatHistoryWindow";
import { ChangeEvent, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  LastReciveMessagesType,
  UserType,
  chatRoomMessagesState,
  lastReciveMessagesState,
  userState,
} from "./states";
import axios from "axios";
import { useQueries, useQuery } from "@tanstack/react-query";

const ChatRoomPage = ({
  roomData,
  chatHistory,
}: {
  roomData: ChatRoom;
  chatHistory: Message[];
}) => {
  const [chatMessages, setChatMessages] = useRecoilState(chatRoomMessagesState);
  const [receiveMessage, setReceiveMessage] = useRecoilState<LastReciveMessagesType>(lastReciveMessagesState);
  const [user, setUser] = useRecoilState<UserType>(userState);

  useEffect(() => {
    setChatMessages(chatHistory);
    const currentReceiveData = {
      [roomData.id]: {
        lastIndex: -1,
        timestamp: Date.now(),
      },
    };
    if (chatHistory.length > 0) {
      const data = chatHistory[chatHistory.length - 1];
      currentReceiveData[roomData.id].lastIndex = data.index;
      if (data.timestamp)
        currentReceiveData[roomData.id].timestamp = data.timestamp;
    }
    setReceiveMessage({
      ...receiveMessage,
      ...currentReceiveData,
    });
  }, [chatHistory]);

  const sendMessage = async (message: Message) => {
    message.from = user.id;
    const readMessage = receiveMessage[roomData.id];
    const newMessage: PayloadMessage = {
      lastReadIndex: readMessage.lastIndex,
      roomId: roomData.id,
      message,
    };

    const response = await axios.post("/api/sendmessage", newMessage);
    if (response.status === 200) {
      const { updateData } = response.data;
      if (updateData.length) {
        const lastMessage = updateData[updateData.length - 1];
        const newMesage = chatMessages.concat(updateData);

        setChatMessages(newMesage);
        const currentReceiveData = {
          [roomData.id]: {
            lastIndex: lastMessage.index,
            timestamp: lastMessage.timestamp,
          },
        };
        setReceiveMessage({
          ...receiveMessage,
          ...currentReceiveData,
        });
      }
    }
  };

  const pollingMessage = async () => {
    
    const readMessage = receiveMessage[roomData.id];
    const newMessage: PayloadMessage = {
      lastReadIndex: readMessage.lastIndex,
      roomId: roomData.id,
    };

    const response = await axios.post("/api/pollingmessage", newMessage);
    if (response.status === 200) {
      console.log("response.data" ,response.data)
      const { updateData } = response.data;
      if (updateData.length) {
        const lastMessage = updateData[updateData.length - 1];
        const newMesage = chatMessages.concat(updateData);
        setChatMessages(newMesage);
        const currentReceiveData = {
          [roomData.id]: {
            lastIndex: lastMessage.index,
            timestamp: lastMessage.timestamp,
          },
        };
        setReceiveMessage({
          ...receiveMessage,
          ...currentReceiveData,
        });
      }
    }
    return ""
  }
  
  
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn:pollingMessage,
    refetchInterval: 5000
  });
  console.log(data)

  const handleUserChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUser(({
      ...user,
      id:event.target.value
    }))
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        번호 : {roomData.id}
        <h3> 이름 : {roomData.name}</h3>
        <h5>{roomData.description}</h5>
        <hr />
        <div> id : <input value={user.id} onChange={handleUserChange}></input>
        </div>
        <ChatHistoryWindow></ChatHistoryWindow>
        <ChatInput sendMessage={sendMessage} />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
};

ChatRoomPage.getInitialProps = async (ctx: NextPageContext) => {
  const id = ctx.query.id;
  const res = await fetch(`http://localhost:3000/api/chatroom?id=${id}`);
  const json = await res.json();
  const chatHistoryRes = await fetch(
    `http://localhost:3000/api/chathistory?id=${id}`
  );
  const chatHistory = await chatHistoryRes.json();
  return { roomData: json, chatHistory: chatHistory };
};

export default ChatRoomPage;