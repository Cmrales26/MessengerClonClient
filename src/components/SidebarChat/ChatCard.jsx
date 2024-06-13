import React from "react";
import { useNavigate } from "react-router-dom";

const ChatCard = ({ chats, chatId }) => {
  const navigator = useNavigate();
  return (
    <div>
      {chats.map((chat) => (
        <div
          className="chat-card"
          key={chat.chatId}
          style={{
            background: chatId == chat.chatId ? "#7fbbf3" : "white",
          }}
          onClick={() =>
            navigator(`/chat/message/${chat.chatId}`, { state: chat })
          }
        >
          <section className="chat">
            <img src={chat.avatar} alt="Profile Picture" />
            <article>
              <h3>
                {chat.name} {chat.lastname}
              </h3>

              <div>
                {chat.status == "0" ? null : (
                  <div className="StatusAlert"></div>
                )}
              </div>
            </article>
          </section>
        </div>
      ))}
    </div>
  );
};

export default ChatCard;
