import { KeyboardEvent, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { chatRoomMessagesState } from "../states";
import { Message } from "../../api/model/chat";
import { createMesage } from "./model";

type ChatInputProps = {
    sendMessage: (nessage:Message)=> void
}

const ChatInput = ({sendMessage} : ChatInputProps) => {
    const [chatMessages, setChatMessages] = useRecoilState(chatRoomMessagesState);
    const [inputMessage, setInputMessage] = useState("");
    const curserPos = useRef(inputMessage.length);
    const inputRef = useRef<HTMLTextAreaElement>(null);


    const handleKeydown = (event: KeyboardEvent<HTMLTextAreaElement>): void  => {
        if (event.key === "Enter") {
            const message : Message = createMesage({id:"", message:inputMessage});
            
            sendMessage(message);
            setInputMessage("");
            
            if (inputRef.current)
                curserPos.current = inputRef.current.selectionStart;
        }
    }

    return (
        <textarea style={{ width: "100%", border: "1px solid #eee" }}
        ref={inputRef}
            placeholder="전송할 메세지를 입력해주세요"
            value={inputMessage}
            onChange={(e)=> setInputMessage(e.target.value)}
            onKeyDown={handleKeydown}
        ></textarea>
    );
};

export default ChatInput;