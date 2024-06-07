import React from "react";
import { useNavigate } from "react-router-dom";

const ChatCard = ({ chats, chatId }) => {
  const truncateMessage = (message, maxLength) => {
    if (message.length > maxLength) {
      return message.slice(0, maxLength) + "...";
    }
    return message;
  };

  const navigator = useNavigate();

  return (
    <div
      style={{
        marginTop: "1rem",
      }}
    >
      {chats.map((chat) => (
        <div
          className="chat-card"
          key={chat.idx}
          style={{
            background: chatId == chat.idx ? "#7fbaf2" : "white",
            padding: ".4rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => navigator(`/chat/message/${chat.idx}`)}
        >
          <section
            className="chat"
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              width: "100%",
            }}
          >
            <img
              src={chat.avatar}
              width={45}
              height={45}
              style={{
                borderRadius: "100%",
                objectFit: "fill",
              }}
              alt=""
            />
            <article style={{ width: "100%" }}>
              <h3 style={{ fontSize: "12px" }}>{chat.name}</h3>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ fontSize: "12px" }}>
                  {truncateMessage(chat.message, 20)}
                </p>
                <span style={{ fontSize: "10px", color: "gray" }}>
                  {chat.time}
                </span>
              </div>
            </article>
          </section>
        </div>
      ))}
    </div>
  );
};

export default ChatCard;
