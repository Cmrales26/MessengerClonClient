import React, { createContext, useState, useContext, useEffect } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatList, setChatList] = useState([]);
  const [chatRequests, setChatRequests] = useState([]);
  const [nRequest, setNRequest] = useState(0);

  const client = import.meta.env.VITE_SERVER_ROUTE;

  return (
    <ChatContext.Provider
      value={{
        chatList,
        chatRequests,
        nRequest,
        client,
        setChatRequests,
        setChatList,
        setNRequest,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};
