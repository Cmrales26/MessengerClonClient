import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import { fetchDataGet, fetchDataPost } from "../utils/fetch";
import SideBarRequest from "../components/SidebarRequest";
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
  }, [navigate]);

  // Get Request
  useEffect(() => {
    console.log("entre a request");
    if (loading === false && userLog.userInfo) {
      let data = {
        MyId: userLog.userInfo.id,
      };
      async function getMyRequest() {
        const res = await fetchDataPost(
          "http://localhost:4040/api/MyRequest",
          data
        );
        setChatRequests(res.data);
      }

      getMyRequest();
    }
  }, [loading, userLog, setChatRequests]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const userId = userLog.userInfo.id;

  if (userId !== undefined) {
    socket.emit("register", userId);
  }
  return (
    <section>
      <TopBar userLog={userLog} />
      <section
        style={{
          display: "flex",
        }}
      >
        <SideBarRequest Request={true} userLog={userLog} />
      </section>
    </section>
  );
};

export default Request;
