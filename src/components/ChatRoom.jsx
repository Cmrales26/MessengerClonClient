import React, { useEffect, useState } from "react";

const ChatRoom = ({ chatId }) => {
  const [chat, setChat] = useState([]);
  useEffect(() => {
    setChat(chatId);
  }, [chatId]);
  return (
    <div>
      <h1>{chat}</h1>
    </div>
  );
};

export default ChatRoom;
