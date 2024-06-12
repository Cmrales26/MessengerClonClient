import React from "react";
import { useNavigate } from "react-router-dom";

const ChatCard = ({ chats, chatId }) => {
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
          key={chat.chatId}
          style={{
            background: chatId == chat.chatId ? "#7fbbf3" : "white",
            padding: ".4rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() =>
            navigator(`/chat/message/${chat.chatId}`, { state: chat })
          }
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
            <article
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3 style={{ fontSize: "12px" }}>
                {chat.name} {chat.lastname}
              </h3>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {chat.status == "0" ? null : (
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: "red",
                      background: "red",
                      borderRadius: "100%",
                      marginRight: "15px",
                    }}
                  ></div>
                )}
                {/* {chat.status} */}
              </div>
            </article>
          </section>
        </div>
      ))}
    </div>
  );
};

export default ChatCard;
