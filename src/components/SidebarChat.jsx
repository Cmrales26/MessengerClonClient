import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchDataPost } from "../utils/fetch";
import { useChat } from "../context/chatContex";
import { socket } from "../utils/SocketConfig";
import { v4 as uuidv4 } from "uuid";

import ChatCard from "./ChatCard";
import CardUserFound from "./CardUserFound";

const SidebarChat = ({ userLog }) => {
  const navigator = useNavigate();
  const [userFound, setUserFound] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [userForChat, setUserForChat] = useState();
  const [loading, setLoading] = useState(true);

  const { chatList, chatRequests, setChatRequests } = useChat();

  const navigate = useNavigate();

  useEffect(() => {
    if (userFound === "") {
      setIsSearch(false);
    }
  }, [userFound]);

  useEffect(() => {
    const loadRequest = () => {
      socket.on("ReceiveRequest", (data) => {
        const newRequest = {
          id: data.id,
          avatar: data.avatar,
          name: data.name,
          lastname: data.lastname,
          RequestDate: data.date,
          senderId: data.SenderId,
        };

        if (
          chatRequests.filter((req) => req.senderId === data.SenderId).length >
          0
        ) {
          return;
        }

        setChatRequests((prev) => [...prev, newRequest]);
        return;
      });
    };
    loadRequest();
  }, [socket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSearch(true);

    let res = await fetchDataPost("http://localhost:4040/api/getUser", {
      username: userFound,
    });

    if (res.status === 404) {
      setUserForChat("");
      setLoading(false);
    } else {
      setUserForChat(res.data);
      setLoading(false);
    }
  };

  const handelNewRequest = async () => {
    const today = new Date();
    const date = today.toISOString().split("T")[0];

    const data = {
      id: uuidv4(),
      SenderId: userLog.userInfo.id,
      TargetId: userForChat.data.id,
      name: userLog.userInfo.name,
      lastname: userLog.userInfo.lastname,
      avatar: userLog.avatarRoute,
      date: date,
    };

    let res = await fetchDataPost(
      "http://localhost:4040/api/chatRequest",
      data
    );

    if (res.status === 208) {
      alert("You already send a chat request to this person.");
      setUserFound("");
      document.querySelector("#userFound").value = "";
      return;
    }

    if (res.status === 200) {
      alert("Request sent successfully");
      socket.emit("SendRequest", data);
      setUserFound("");
      document.querySelector("#userFound").value = "";
      return;
    }
  };

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
          style={{
            textDecoration: "none",
            color: "blue",
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
            color: "grey",
          }}
        >
          Request
        </Link>
      </div>

      <form action="" style={{ marginTop: "5px" }} onSubmit={handleSubmit}>
        <div className="">
          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            {/* <label htmlFor="userFound">Find user</label> */}
          </div>
          <input
            id="userFound"
            style={{
              border: "none",
              width: "100%",
              height: "20px",
              padding: "1rem",
              borderRadius: "4px",
              marginTop: "1rem",
              background: "#f0f0f0",
            }}
            placeholder="Username"
            type="text"
            onChange={(value) => {
              setUserFound(value.target.value);
            }}
          />
        </div>
      </form>
      {isSearch ? (
        <CardUserFound
          user={userForChat}
          setUserFound={setUserFound}
          userLog={userLog}
          handelNewRequest={handelNewRequest}
          loading={loading}
        />
      ) : (
        <ChatCard chats={[...chatList].reverse()} />
      )}

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
          navigator("/login");
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

export default SidebarChat;
