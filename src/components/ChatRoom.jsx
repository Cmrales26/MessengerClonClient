import React, { useEffect, useState } from "react";
import { fetchDataPost } from "../utils/fetch";
import { useChat } from "../context/chatContex";

const ChatRoom = ({ chatId, userLog, userId }) => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(true);
  const [ChatInfoUser, setChatInfoUser] = useState();

  const CurrentUserLogId = userLog.userInfo.id;

  const { chatList, addChat } = useChat();

  // useEffect(() => {
  //   const getInfoChat = async () => {
  //     if (chatId) {
  //       setChat(chatId);
  //       setLoading(false);
  //       return;
  //     }

  //     if (userId) {
  //       setChat(userId);
  //       let res = await fetchDataPost("http://localhost:4040/api/getUserId", {
  //         userId: userId,
  //       });

  //       console.log(res.data);

  //       setChatInfoUser(res.data);

  //       setLoading(false);
  //       return;
  //     }
  //   };
  //   getInfoChat();
  // }, [chatId, userId]);

  const SendToSocket = () => {
    const targetUser = ChatInfoUser.data.id || null;
    const senderId = CurrentUserLogId;
    socket.emit("sendMessage", { message, targetUser, senderId });
  };

  if (loading) {
    return (
      <div
        className=""
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
    <div
      style={{
        width: "80%",
      }}
    >
      <div className="">
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
            {ChatInfoUser.data.name} {ChatInfoUser.data.lastname}
          </p>
        </section>

        <section
          style={{
            height: "65vh",
            minHeight: "65vh",
            overflow: "auto",
            padding: "1rem",
          }}
        >
          <h1>{chat}</h1>
        </section>

        <section
          style={{
            display: "flex",
            padding: "1rem",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Type a message"
            style={{
              width: "100%",
              height: "40px",
              padding: "1rem",
              border: "none",
              outline: "none",
              borderRadius: "4px",
              background: "#f0f0f0",
            }}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "100%",
              border: "none",
              backgroundColor: "#0084ff",
            }}
            onClick={SendToSocket}
          >
            {"Send"}
          </button>
        </section>

        {/* Input chat */}
      </div>
    </div>
  );
};

export default ChatRoom;
