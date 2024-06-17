import React, { useEffect, useRef } from "react";
import SidebarNavigation from "../SidebarNavigation";
import RequestCard from "./RequestCard";
import { useNavigate } from "react-router-dom";
import { fetchDataDelete, fetchDataPost } from "../../utils/fetch";
import { useChat } from "../../context/chatContex";
import { socket } from "../../utils/SocketConfig";

const SideBarRequest = () => {
  const navigate = useNavigate();
  const { chatRequests, nRequest, setNRequest, setChatRequests, client } =
    useChat();
  const receiveRequestListener = useRef(null);

  useEffect(() => {
    if (!receiveRequestListener.current) {
      receiveRequestListener.current = async (data) => {
        setChatRequests((prev) => [...prev, data]);
      };
      socket.on("ReceiveRequest", receiveRequestListener.current);
    }
    return () => {
      if (receiveRequestListener.current) {
        socket.off("ReceiveRequest", receiveRequestListener.current);
        receiveRequestListener.current = null;
      }
    };
  }, [socket]);

  const handleAccept = async (data) => {
    const apiData = {
      chatId: data.RequestId,
      user1: data.SenderId,
      user2: data.TargetId,
    };

    const dataChat = {
      chatId: data.RequestId,
      user1: data.SenderId,
      user2: data.TargetId,
      avatar: data.avatar,
      name: data.name,
      lastname: data.lastname,
    };

    try {
      const res = await fetchDataPost(
        `${client}/api/AcceptChatRequest`,
        apiData
      );

      if (res.status === 200) {
        const resDelete = await fetchDataDelete(
          `${client}/api/DeleteChatRequest/${apiData.chatId}`
        );

        if (resDelete.status === 200) {
          setNRequest((prev) => prev - 1);
          navigate(`/chat/message/${dataChat.chatId}`, { state: dataChat });
        }
      }
    } catch (error) {
      console.error("Error accepting chat request:", error);
    }
  };

  const handleDecline = async (id) => {
    try {
      const newChatRequests = chatRequests.filter(
        (request) => request.RequestId !== id
      );

      const res = await fetchDataDelete(
        `${client}/api/DeleteChatRequest/${id}`
      );

      console.log(res.status);

      if (res.status === 200) {
        setChatRequests(newChatRequests);
        setNRequest((prev) => prev - 1);
      }
    } catch (error) {
      console.error("Error declining chat request:", error);
    }
  };

  return (
    <div id="RequestSidebar">
      <h2>Chat Request</h2>
      <SidebarNavigation focus={"Request"} nRequest={nRequest} />

      <RequestCard
        request={[...chatRequests].reverse()}
        handleDecline={handleDecline}
        handleAccept={handleAccept}
      />
    </div>
  );
};

export default SideBarRequest;
