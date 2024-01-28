export const getChatHistory = async (id: string) => {
  const chatHistoryRes = await fetch(
    `http://localhost:8000/api/chatroom/${id}/history`
  );
  const chatHistory = await chatHistoryRes.json();
  return chatHistory.data;
};

export const getRoomList = async () => {
  const roomsRes = await fetch("http://127.0.0.1:8000/api/chatroom");
  const rooms = await roomsRes.json();
  return rooms.data;
};

export const getChartHistoricals = async (ticker: string) => {
  const chatHistoryRes = await fetch(
    `http://localhost:8000/api/chart/historicals/${ticker}`
  );
  const chatHistory = await chatHistoryRes.json();
  return chatHistory.data;
};