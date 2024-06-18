import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { socket } from "../utils/SocketConfig";
import { useChat } from "../context/chatContex";
import { fetchDataDelete, fetchDataGet, fetchDataPost } from "../utils/fetch";
import { MenuComponent } from "./Menu";

import SendMessageIcon from "../assets/icons/SendMessage.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ChatRoom = ({ userLog, setSelectedChatId }) => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [ChatInfoUser, setChatInfoUser] = useState();

  const navigate = useNavigate();
  const chatEndRef = useRef(null);
  let { chatId } = useParams();
  let { state } = useLocation();
  const { chatList, setChatList, client } = useChat();

  const CurrentUserLogId = userLog.userInfo.id;

  const getMessages = async (PChatId) => {
    const res = await fetchDataGet(`${client}/api/GetMessage/${PChatId}`);
    return res;
  };

  useEffect(() => {
    if (chatId !== undefined && state) {
      setChatInfoUser(state);
      setLoading(false);
      setSelectedChatId(chatId);
      socket.emit("JoinRoom", { chatId, CurrentUserLogId });

      socket.on("JoinRoom", async () => {
        let res = await getMessages(chatId);
        setChat([]);
        setChat(res);
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

      socket.on("deleteChatNotification", (data) => {
        const DeleteChatId = data.chatId;
        const NewChatList = chatList.filter(
          (chat) => chat.chatId !== DeleteChatId
        );
        setChatList(NewChatList);
        if (DeleteChatId !== chatId) {
          console.log("Delete Message");
        } else {
          setLoading(true);
          navigate("/");
        }
      });

      socket.on("clearChatNotification", (data) => {
        setChat([]);
      });

      return () => {
        socket.off("privateMessage");
        socket.off("JoinRoom");
        socket.off("deleteChatNotification");
      };
    } else {
      navigate("/");
    }
  }, [chatId, state, CurrentUserLogId, navigate, setSelectedChatId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [chat]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const MessageData = {
      chatId,
      message,
      senderId: CurrentUserLogId,
      TargetId: ChatInfoUser.id ?? ChatInfoUser.user1,
      timestamp: new Date().toISOString(),
    };

    const res = await fetchDataPost(`${client}/api/SetMessage`, MessageData);

    if (res.status !== 200) {
      return;
    }

    socket.emit("privateMessage", MessageData);

    setChatList((prevChatList) =>
      prevChatList.map((chat) =>
        chat.chatId === chatId ? { ...chat, status: 0 } : chat
      )
    );

    setMessage("");
  };

  const Delete = async () => {
    const res = await fetchDataDelete(`${client}/api/DeleteChats/${chatId}`);
    if (res.status !== 200) {
      return;
    }

    const NewChatList = chatList.filter((chat) => chat.chatId !== chatId);

    setChatList(NewChatList);
    setLoading(true);
    navigate("/");
    socket.emit("deleteChat", {
      chatId,
      UserId: ChatInfoUser.id ?? ChatInfoUser.user1,
    });
  };

  const ClearChat = async () => {
    const res = await fetchDataDelete(`${client}/api/ClearMessage/${chatId}`);
    if (res.status !== 200) {
      return;
    }
    socket.emit("clearChat", {
      chatId,
      UserId: ChatInfoUser.id ?? ChatInfoUser.user1,
    });

    setChat([]);
  };

  if (loading || ChatInfoUser === undefined) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "85vh",
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
          <div className="UserChatInfo">
            <img src={ChatInfoUser.avatar} alt="Profile photo" />
            <p>
              {ChatInfoUser.name} {ChatInfoUser.lastname}
            </p>
          </div>
          <div className="Menu">
            <MenuComponent
              options={[
                { option: "Delete Chat", method: Delete },
                { option: "Clear Chat", method: ClearChat },
              ]}
              icon={<MoreVertIcon />}
            />
          </div>
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
          </div>
          <div ref={chatEndRef} />
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
