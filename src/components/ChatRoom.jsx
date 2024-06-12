import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { socket } from "../utils/SocketConfig";
import { useChat } from "../context/chatContex";

const ChatRoom = ({ userLog, setSelectedChatId }) => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [ChatInfoUser, setChatInfoUser] = useState();
  const CurrentUserLogId = userLog.userInfo.id;
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  let { chatId } = useParams();
  let { state } = useLocation();
  const { setChatList } = useChat();

  useEffect(() => {
    if (chatId !== undefined && state) {
      setChatInfoUser(state);
      setLoading(false);
      setSelectedChatId(chatId);
      socket.emit("JoinRoom", { chatId, CurrentUserLogId });

      socket.on("JoinRoom", (data) => {
        setChat([]);
      });

      socket.on("privateMessage", (data) => {
        setChat((prev) => [...prev, data]);
      });

      setChatList((prevChatList) =>
        prevChatList
          .map((chat) =>
            chat.chatId === chatId ? { ...chat, status: 0 } : chat
          )
          .sort((a, b) => b.status - a.status)
      );

      return () => {
        socket.off("privateMessage");
        socket.off("JoinRoom");
      };
    } else {
      navigate("/");
    }
  }, [chatId, state, CurrentUserLogId, navigate, setSelectedChatId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    socket.emit("privateMessage", {
      chatId,
      message,
      senderId: CurrentUserLogId,
      TargetId: ChatInfoUser.id ?? ChatInfoUser.user1,
      timestamp: new Date().toISOString(),
    });

    setChatList((prevChatList) =>
      prevChatList.map((chat) =>
        chat.chatId === chatId ? { ...chat, status: 0 } : chat
      )
    );

    setMessage("");
  };

  if (loading || ChatInfoUser === undefined) {
    return (
      <div
        style={{
          width: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1>Welcome</h1>
      </div>
    );
  }

  return (
    <div style={{ width: "80%" }}>
      <div>
        <section
          style={{
            padding: ".7rem",
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)",
          }}
          id="Chat-app-bar"
        >
          <img
            src={ChatInfoUser.avatar}
            alt="Profile photo"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "100%",
            }}
          />
          <p>
            {ChatInfoUser.name} {ChatInfoUser.lastname}
          </p>
        </section>

        <section
          style={{
            height: "67vh",
            minHeight: "65vh",
            overflow: "auto",
            padding: "1rem",
          }}
          id="Chat"
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {chat.map((messages, idx) => (
              <p
                style={{
                  alignSelf: `${
                    messages.senderId === CurrentUserLogId
                      ? "flex-end"
                      : "flex-start"
                  }`,
                  fontSize: "13px",
                  margin: "1rem",
                  padding: ".5rem 1rem",
                  borderRadius: "10px",
                  backgroundColor: `${
                    messages.senderId === CurrentUserLogId ? "#cce6ff" : "#ccc"
                  }`,
                  maxWidth: "400px",
                  wordWrap: "break-word",
                  wordBreak: "break-all",
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)",
                }}
                key={idx}
              >
                {messages.message}
              </p>
            ))}
            <div ref={chatEndRef} />
          </div>
        </section>

        <form
          style={{
            display: "flex",
            padding: "1rem",
            gap: "1rem",
            alignItems: "center",
          }}
          onSubmit={sendMessage}
        >
          <input
            id="InputMessage"
            type="text"
            placeholder="Type a message"
            value={message}
            style={{
              width: "100%",
              height: "40px",
              padding: "1rem",
              border: "none",
              outline: "none",
              borderRadius: "4px",
              background: "#f0f0f0",
            }}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "40%",
              border: "none",
              backgroundColor: "#0084ff",
              cursor: "pointer",
            }}
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-send"
              width="20"
              height="20"
              viewBox="0 0 26 20"
              strokeWidth="2"
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 14l11 -11" />
              <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
