import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { FC, useState } from "react";
import { ChatRoom } from "./api/model/chat";


type ChatRoomCardProps = {
  children: React.ReactNode;
};
const ChatRoomCardContainer = ({ children }: ChatRoomCardProps) => {
  return <div className={styles.grid}>{children}</div>;
};

const ChatRoomCard = ({data}: {data: ChatRoom} ) => {
  return (
    <a href={`/chatroom/${data.id}`} className={styles.card}>
      <h2>{data.name} &rarr; </h2>
      <p>{data.description}</p>
    </a>
  );
};

const Dashboard = ({rooms}: {rooms: ChatRoom[]}) => {
  const [chatRooms, setChatRooms] = useState([0, 1, 2, 3, 4]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ChatRoomCardContainer>
          {rooms.map((v:ChatRoom) => (
            <ChatRoomCard data={v} />
          ))}
        </ChatRoomCardContainer>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

Dashboard.getInitialProps = async (ctx: NextPageContext) => {
    const res = await fetch('http://localhost:3000/api/chatrooms')
    
    const json = await res.json()
    console.log(json)
    return {rooms:json} 
}

export default Dashboard;
