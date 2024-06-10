import React, { createContext, useState, useContext } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatList, setChatList] = useState([]);

  const [chatRequests, setChatRequests] = useState([]);

  const addChat = (newChat) => {
    setChatList((prevChats) => [...prevChats, newChat]);
  };

  return (
    <ChatContext.Provider
      value={{ chatList, chatRequests, setChatRequests, addChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};
