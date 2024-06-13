import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { socket } from "../utils/SocketConfig";
import { useChat } from "../context/chatContex";

import SendMessageIcon from "../assets/icons/SendMessage.svg";

const ChatRoom = ({ userLog, setSelectedChatId }) => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [ChatInfoUser, setChatInfoUser] = useState();

  const navigate = useNavigate();
  const chatEndRef = useRef(null);
  let { chatId } = useParams();
  let { state } = useLocation();
  const { setChatList } = useChat();

  const CurrentUserLogId = userLog.userInfo.id;

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
    <div id="ChatRoom">
      <div>
        <section id="Chat-app-bar">
          <img src={ChatInfoUser.avatar} alt="Profile photo" />
          <p>
            {ChatInfoUser.name} {ChatInfoUser.lastname}
          </p>
        </section>

        <section id="Chat">
          <div id="ChatContent">
            {chat.map((messages, idx) => (
              <p
                id="Message"
                style={{
                  alignSelf: `${
                    messages.senderId === CurrentUserLogId
                      ? "flex-end"
                      : "flex-start"
                  }`,
                  backgroundColor: `${
                    messages.senderId === CurrentUserLogId ? "#cce6ff" : "#ccc"
                  }`,
                }}
                key={idx}
              >
                {messages.message}
              </p>
            ))}
            <div ref={chatEndRef} />
          </div>
        </section>

        <form onSubmit={sendMessage}>
          <input
            id="InputMessage"
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">
            <img src={SendMessageIcon} alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
