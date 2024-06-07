import React, { useEffect, useState } from "react";
import SidebarChat from "../components/SidebarChat";
import { useNavigate, useParams } from "react-router-dom";
import ChatRoom from "../components/ChatRoom";
import { fetchDataGet } from "../utils/fetch";
import TopBar from "../components/TopBar";

const chat = () => {
  let { chatId } = useParams();
  const navigate = useNavigate();
  const [userLog, setUserLog] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserToken() {
      let token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      let response = await fetchDataGet(
        `http://localhost:4040/api/validateToken/${token}`
      );

      setUserLog(response);
      setLoading(false);
    }
    getUserToken();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <section>
      <TopBar userLog={userLog} />
      <section
        style={{
          display: "flex",
        }}
      >
        <SidebarChat chatId={chatId ?? null} />
        <ChatRoom chatId={chatId ?? null} />
      </section>
    </section>
  );
};

export default chat;
