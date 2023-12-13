import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  LastReciveMessagesType,
  chatRoomMessagesState,
  lastReciveMessagesState,
  userState,
} from "../../states/chatState";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChatRoomType, MessageType } from "../../types/chat";
import {
  PayloadSendMessage,
  PayloadPollingMessage,
} from "../model/chat";
import { UserType } from "../../types/user";

export const useMessages = (roomData: ChatRoomType) => {
  const [chatMessages, setChatMessages] = useRecoilState(chatRoomMessagesState);
  const [receiveMessage, setReceiveMessage] =
    useRecoilState<LastReciveMessagesType>(lastReciveMessagesState);
  const user = useRecoilValue<UserType>(userState);

  const sendMessage = async (message: MessageType) => {
    message.from = user.id;
    const readMessage = receiveMessage[roomData.id];
    const newMessage: PayloadSendMessage = {
      lastReadIndex: readMessage.lastIndex,
      roomId: roomData.id,
      message,
    };

    const response = await axios.post("/api/sendmessage", newMessage);
    if (response.status === 200) {
      const { updateData } = response.data;
      if (updateData.length) {
        const newMesage = chatMessages.concat(updateData);
        setChatMessages(newMesage);
        
        const lastMessage = updateData[updateData.length - 1];
        updateLastMessage(lastMessage);
      }
    }
  };

  const updateLastMessage = (lastMessage: MessageType) => {
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

  const pollingMessage = async () => {
    const readMessage = receiveMessage[roomData.id];
    const newMessage: PayloadPollingMessage = {
      lastReadIndex: readMessage.lastIndex,
      roomId: roomData.id,
    };

    const response = await axios.post("/api/pollingmessage", newMessage);
    if (response.status === 200) {
      const { updateData } = response.data;
      if (updateData.length) {
        const newMesage = chatMessages.concat(updateData);
        setChatMessages(newMesage);

        const lastMessage = updateData[updateData.length - 1];
        updateLastMessage(lastMessage);
      }
    }
    return "";
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: pollingMessage,
    refetchInterval: 5000,
  });

  return {
    sendMessage,
    isPending,
    error,
    data,
  };
};
