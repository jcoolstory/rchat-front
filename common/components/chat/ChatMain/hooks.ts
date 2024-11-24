import { useQuery } from "@tanstack/react-query";
import { getChatHistory } from "common/api";
import { useSetRecoilState } from "recoil";
import { chatRoomMessagesState } from "states/chatState";
import { ChatRoomType } from "types/chat";

export const useHistoryHooks = (roomData: ChatRoomType) => {
    const setChatMessages = useSetRecoilState(chatRoomMessagesState);
  
    const {
      data: chatHistory,
      isLoading,
      error,
    } = useQuery({
      queryKey: ["getChatHistory", roomData],
      queryFn: async () => {
        const data = await getChatHistory(roomData.id);
        setChatMessages(data);
        return data;
      },
      refetchOnWindowFocus: false,
    });
    return {
      chatHistory,
      isLoading,
      error,
    };
  };
  