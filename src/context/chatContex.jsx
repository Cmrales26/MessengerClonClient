import React, { createContext, useState, useContext, useEffect } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatList, setChatList] = useState([]);
  const [chatRequests, setChatRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nRequest, setNRequest] = useState(0);

  useEffect(() => {
    numOfRequest();
    setLoading(false);
  }, [chatRequests]);

  const numOfRequest = () => {
    let num = 0;
    chatRequests.map((item) => {
      if (item.Status === "0") {
        num += 1;
      }
    });
    setNRequest(num);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

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
