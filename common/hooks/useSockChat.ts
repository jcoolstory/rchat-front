import { useCallback, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { chatRoomMessagesState, userState } from "../../states/chatState";
import { ChatRoomType, ChatMessageType, TrDataType, TrType, InputChatMessageType } from "../../types/chat";
import { UserType } from "../../types/user";
import { PayloadSendMessage } from "../model/chat";
import { wsm } from "common/model/WSManager";

export const useSockChat = (roomData: ChatRoomType) => {
    const user = useRecoilValue<UserType>(userState);
    const setChatMessages = useSetRecoilState(chatRoomMessagesState);
    
    const sendMessage = useCallback(
      async (message: InputChatMessageType) => {
        message.sender = user.id;
        message.roomId = roomData.id;
        const newMessage: PayloadSendMessage = {
          message,
        };
  
        wsm.sendMessage(newMessage);
      },
      [user.id]
    );
  
    const receive = useCallback( (updateData: TrDataType) => {
      if (updateData.type === TrType.chatroom) {
        const message: ChatMessageType = updateData.content.message as ChatMessageType;
        setChatMessages( (prev) => ([...prev, message]));
      }
    }, []);
  
    useEffect(() => {
      const url = `ws://localhost:8000/ws/chat/${roomData.id}`;
      wsm.connect(url, user.id);
      wsm.onReceive(receive);
      return () => wsm.close();
    }, []);
  
    return {
      sendMessage,
    };
  };
  