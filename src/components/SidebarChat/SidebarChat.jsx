import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDataPost } from "../../utils/fetch";
import { useChat } from "../../context/chatContex";
import { socket } from "../../utils/SocketConfig";

import ChatCard from "./ChatCard";
import CardUserFound from "./CardUserFound";
import SidebarNavigation from "../SidebarNavigation";
import SearchUser from "./SearchUser";

const SidebarChat = ({
  userLog,
  selectedChatId,
  setAreRequest,
  areRequest,
}) => {
  const [userFound, setUserFound] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [userForChat, setUserForChat] = useState();
  const [loading, setLoading] = useState(true);

  const { chatList, setChatRequests, setChatList } = useChat();

  const navigator = useNavigate();

  useEffect(() => {
    socket.on("ReceiveRequest", () => {
      setAreRequest(true);
    });
  }, [socket, setAreRequest]);

  useEffect(() => {
    const data = {
      MyId: userLog.userInfo.id,
    };
    async function getChats() {
      const res = await fetchDataPost("http://localhost:4040/api/chats", data);

      if (res.status === 200) {
        setChatList(res.data);
      }
    }
    getChats();
  }, [setChatList]);

  async function getUser(userId) {
    try {
      let res = await fetchDataPost("http://localhost:4040/api/getUserId", {
        userId: userId,
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    socket.on("GetMessage", async (data) => {
      setChatList((prevChatList) => {
        const chatExists = prevChatList.some(
          (chat) => chat.chatId === data.chatId
        );
        if (chatExists) {
          return prevChatList
            .map((chat) =>
              chat.chatId === data.chatId ? { ...chat, status: 1 } : chat
            )
            .sort((a, b) => b.status - a.status);
        } else {
          let Id = data.senderId;
          getUser(Id).then((res) => {
            const newChat = {
              chatId: data.chatId,
              avatar: res.avatar,
              name: res.data.name,
              lastname: res.data.lastname,
            };

            setChatList((prev) =>
              [...prev, newChat].sort((a, b) => a.status - b.status)
            );
          });
        }

        return prevChatList;
      });
    });

    return () => {
      socket.off("GetMessage");
    };
  }, [socket, setChatList]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setChatRequests([]);
    navigator("/login");
  };

  const sortedChats = [...chatList].sort((a, b) => a.status - b.status);

  return (
    <div id="SidebarChat">
      <h2>Chats</h2>

      <SidebarNavigation focus={"Home"} areRequest={areRequest} />

      <SearchUser
        setUserFound={setUserFound}
        setIsSearch={setIsSearch}
        userFound={userFound}
        setUserForChat={setUserForChat}
        setLoading={setLoading}
      />

      {isSearch ? (
        <CardUserFound
          user={userForChat}
          setUserFound={setUserFound}
          userLog={userLog}
          loading={loading}
        />
      ) : (
        <div className="ChatCards">
          <ChatCard chats={sortedChats.reverse()} chatId={selectedChatId} />
        </div>
      )}

      <div style={{ flexGrow: 1 }} />

      <button id="LogOut" onClick={() => handleLogout()}>
        Log Out
      </button>
    </div>
  );
};

export default SidebarChat;
