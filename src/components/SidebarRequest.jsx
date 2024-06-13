import React from "react";
import SidebarNavigation from "./SidebarNavigation";
import RequestCard from "./RequestCard";
import { useNavigate } from "react-router-dom";
import { fetchDataDelete, fetchDataPost } from "../utils/fetch";
import { useChat } from "../context/chatContex";

const SideBarRequest = () => {
  const navigate = useNavigate();
  const { chatRequests, nRequest, setNRequest, setChatRequests } = useChat();

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
        "http://localhost:4040/api/AcceptChatRequest",
        apiData
      );

      if (res.status === 200) {
        const resDelete = await fetchDataDelete(
          `http://localhost:4040/api/DeleteChatRequest/${apiData.chatId}`
        );

        if (resDelete.status === 200) {
          setNRequest((prev) => prev - 1);
          navigate(`/chat/message/${dataChat.chatId}`, { state: dataChat });
        }
      }
    } catch (error) {
      console.error("Error accepting chat request:", error);
      // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
    }
  };

  const handleDecline = async (id) => {
    try {
      const newChatRequests = chatRequests.filter(
        (request) => request.RequestId !== id
      );

      const res = await fetchDataDelete(
        `http://localhost:4040/api/DeleteChatRequest/${id}`
      );

      if (res.status === 200) {
        setChatRequests(newChatRequests);
        setNRequest((prev) => prev - 1);
      }
    } catch (error) {
      console.error("Error declining chat request:", error);
    }
  };

  return (
    <div
      style={{
        width: "30%",
        borderRight: "1px solid gray",
        padding: "1rem",
        height: "90vh",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2 style={{ fontSize: "15px" }}>Chats</h2>

      <SidebarNavigation focus={"Request"} nRequest={nRequest} />

      <h3 style={{ marginTop: "1rem" }}>Chat Request</h3>

      <RequestCard
        request={[...chatRequests].reverse()} // Reversing to show latest requests first
        handleDecline={handleDecline}
        handleAccept={handleAccept}
      />

      <div style={{ flexGrow: 1 }} />

      <button
        style={{
          width: "100%",
          border: "none",
          color: "red",
          padding: ".5rem .3rem",
          cursor: "pointer",
          borderRadius: "4px",
          textDecoration: "none",
          transition: "all 0.3s ease",
        }}
        onClick={() => {
          localStorage.removeItem("token");
          setChatRequests([]);
          navigate("/login");
        }}
      >
        Log Out
      </button>

      <p
        style={{
          color: "gray",
          marginTop: "10px",
        }}
      ></p>
    </div>
  );
};

export default SideBarRequest;
