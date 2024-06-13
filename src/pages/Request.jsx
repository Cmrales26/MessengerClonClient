import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import SideBarRequest from "../components/SidebarRequest";
import { fetchDataGet, fetchDataPost } from "../utils/fetch";
import { socket } from "../utils/SocketConfig";
import { useNavigate } from "react-router-dom";
import { useChat } from "../context/chatContex";

const Request = () => {
  const navigate = useNavigate();
  const { setChatRequests } = useChat();

  const [loading, setLoading] = useState(true);
  const [userLog, setUserLog] = useState({});

  useEffect(() => {
    async function getUserToken() {
      try {
        let token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        let response = await fetchDataGet(
          `http://localhost:4040/api/validateToken/${token}`
        );
        setUserLog(response);
      } catch (error) {
        console.error("Error fetching user token:", error);
        navigate("/login"); // Manejar el error redirigiendo al usuario a la página de inicio de sesión
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
          const res = await fetchDataPost(
            "http://localhost:4040/api/MyRequest",
            data
          );
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
    return <h1>Loading... Request</h1>;
  }

  return (
    <section>
      <TopBar userLog={userLog} />
      <section style={{ display: "flex" }}>
        <SideBarRequest Request={true} userLog={userLog} />
      </section>
    </section>
  );
};

export default Request;
