import React, { createContext, useState, useContext } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatList, setChatList] = useState([]);
  const [chatRequests, setChatRequests] = useState([]);
  const [nRequest, setNRequest] = useState(0);

  return (
    <ChatContext.Provider
      value={{
        chatList,
        chatRequests,
        nRequest,
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
