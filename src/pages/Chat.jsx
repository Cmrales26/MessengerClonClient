import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDataGet, fetchDataPost } from "../utils/fetch";
import { socket } from "../utils/SocketConfig";
import { useChat } from "../context/chatContex";

import SidebarChat from "../components/SidebarChat/SidebarChat";
import ChatRoom from "../components/ChatRoom";
import TopBar from "../components/TopBar";
import Loader from "../components/Loader";

const Chat = () => {
  const [userLog, setUserLog] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedChatId, setSelectedChatId] = useState(0);
  const [areRequest, setAreRequest] = useState(false);

  const navigate = useNavigate();
  const { setChatRequests, client } = useChat();

  useEffect(() => {
    async function getUserToken() {
      try {
        let token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        let response = await fetchDataGet(
          `${client}/api/validateToken/${token}`
        );
        setUserLog(response);
      } catch (error) {
        console.error("Error fetching user token:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }
    getUserToken();
  }, [setUserLog]);

  useEffect(() => {
    async function getMyRequest() {
      try {
        if (!loading && userLog.userInfo) {
          const data = {
            MyId: userLog.userInfo.id,
          };
          const res = await fetchDataPost(`${client}/api/MyRequest`, data);
          if (res.data) {
            setChatRequests(res.data);
            setAreRequest(true);
          } else {
            console.log("no hay request");
          }
        }
      } catch (error) {
        console.error("Error fetching user requests:", error);
      }
    }
    getMyRequest();
  }, [loading, userLog, setChatRequests, setAreRequest]);

  useEffect(() => {
    if (userLog.userInfo && userLog.userInfo.id) {
      socket.emit("register", userLog.userInfo.id);
    }
  }, [userLog]);

  if (loading) {
    return <Loader message={"Loading Chats"} redirect={"/"} />;
  }

  return (
    <section>
      <TopBar userLog={userLog} />
      <section style={{ display: "flex" }}>
        <SidebarChat
          userLog={userLog}
          selectedChatId={selectedChatId}
          setAreRequest={setAreRequest}
          areRequest={areRequest}
        />
        <ChatRoom userLog={userLog} setSelectedChatId={setSelectedChatId} />
      </section>
    </section>
  );
};

export default Chat;
