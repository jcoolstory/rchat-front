import { KeyboardEvent, useRef, useState } from "react";
import { createMesage } from "./model";
import { ChatMessageType } from "../../types/chat";

type ChatInputProps = {
  sendMessage: (nessage:string) => void;
};

const ChatInput = ({ sendMessage }: ChatInputProps) => {
  const [inputMessage, setInputMessage] = useState("");
  const curserPos = useRef(inputMessage.length);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleKeydown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
    
    if (event.key === "Enter") {
        event.preventDefault();
        const trimMessage = inputMessage.trim();
      if (!trimMessage) return;
      sendMessage(trimMessage);
      setInputMessage("");
      if (inputRef.current) curserPos.current = inputRef.current.selectionStart;
    }
  };

  return (
    <textarea
      style={{
        width: "100%",
        border: "1px solid #eee",
        height: 50,
        padding: 5,
      }}
      ref={inputRef}
      placeholder="메세지를 입력하세요."
      value={inputMessage}
      onChange={(e) => setInputMessage(e.target.value)}
      onKeyPress={handleKeydown}
    ></textarea>
  );
};

export default ChatInput;
