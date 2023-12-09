import { useRecoilValue } from "recoil";
import { chatRoomMessagesState, userState } from "../states";

const ChatHistoryWindow = () => {
    const chatMessages = useRecoilValue(chatRoomMessagesState);
    const user = useRecoilValue(userState);
    return (
        <div style={{ padding:"10px", border: "1px solid #eee", height: "200px", width: "100%", display: "flex", flexDirection: "column" }}>
            {
                chatMessages.map( (v, i)=> (
                    <div style={{textAlign: `${v.from === user.id ? "right" : "left"}`}} key={i}>{v.message}</div>
                ))
            }
        </div>
    );
};

export default ChatHistoryWindow;