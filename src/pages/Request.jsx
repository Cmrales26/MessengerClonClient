import { useEffect, useState } from "react";
import { fetchDataGet, fetchDataPost } from "../utils/fetch";
import { socket } from "../utils/SocketConfig";
import { useNavigate } from "react-router-dom";
import { useChat } from "../context/chatContex";

import TopBar from "../components/TopBar";
import SideBarRequest from "../components/SidebarRequest/SidebarRequest";
import Loader from "../components/Loader";
import ChatRoom from "../components/ChatRoom";

const Request = () => {
  const { setChatRequests, client } = useChat();

  const [loading, setLoading] = useState(true);
  const [userLog, setUserLog] = useState({});

  const navigate = useNavigate();

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
  }, [navigate]);

  useEffect(() => {
    if (!loading && userLog.userInfo) {
      async function getMyRequest() {
        try {
          const data = {
            MyId: userLog.userInfo.id,
          };
          const res = await fetchDataPost(`${client}/api/MyRequest`, data);
          setChatRequests(res.data);
        } catch (error) {
          console.error("Error fetching user requests:", error);
        } finally {
          setLoading(false);
        }
      }
      getMyRequest();
    }
  }, [loading, userLog, setChatRequests]);

  useEffect(() => {
    if (userLog.userInfo && userLog.userInfo.id) {
      socket.emit("register", userLog.userInfo.id);
    }
  }, [userLog]);

  if (loading) {
    return <Loader message={"Loading Request"} redirect={"/ChatRequest"} />;
  }

  return (
    <section>
      <TopBar userLog={userLog} />
      <section id="Requests" style={{ display: "flex" }}>
        <SideBarRequest Request={true} userLog={userLog} />
        <div
          style={{
            width: "100%",
          }}
        ></div>
      </section>
    </section>
  );
};

export default Request;
