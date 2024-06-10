import { Link, useNavigate } from "react-router-dom";
import { useChat } from "../context/chatContex";

import RequestCard from "./RequestCard";
import { useEffect } from "react";
import { fetchDataPost } from "../utils/fetch";

const SideBarRequest = ({ userLog }) => {
  const { chatRequests, setChatRequests } = useChat();
  const navigate = useNavigate();

  useEffect(() => {
    let data = {
      MyId: userLog.userInfo.id,
    };
    async function getMyRequest() {
      const res = await fetchDataPost(
        "http://localhost:4040/api/MyRequest",
        data
      );
      setChatRequests(res.data);
      console.log(res.data);
    }

    getMyRequest();
  }, [chatRequests, setChatRequests]);

  return (
    <div
      style={{
        width: "20%",
        borderRight: "1px solid gray",
        padding: "1rem",
        height: "90vh",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2 style={{ fontSize: "15px" }}>Chats</h2>

      <div
        className="Options"
        style={{
          fontSize: "12px",
          display: "flex",
          gap: "1rem",
          marginTop: "5px",
        }}
      >
        <Link
          to={"/"}
          style={{
            textDecoration: "none",
            color: "grey",
          }}
        >
          Messages
        </Link>
        <Link
          style={{
            textDecoration: "none",
            color: "grey",
          }}
        >
          Solicitude
        </Link>
        <Link
          to={"/ChatRequest"}
          style={{
            textDecoration: "none",
            color: "blue",
          }}
        >
          Request
        </Link>
      </div>

      <h3
        style={{
          marginTop: "1rem",
        }}
      >
        Chat Request
      </h3>

      <RequestCard request={[...chatRequests].reverse()} />

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
