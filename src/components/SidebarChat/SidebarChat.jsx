import { useEffect, useRef, useState } from "react";
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
  setIsInChat,
  isInChat,
}) => {
  const [userFound, setUserFound] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [userForChat, setUserForChat] = useState();
  const [loading, setLoading] = useState(true);

  const { chatList, setChatList, client } = useChat();

  const receiveRequestListener = useRef(null);
  const getMessageListener = useRef(null);

  const navigator = useNavigate();

  // Charge the Notification when user get a new request

  useEffect(() => {
    if (!receiveRequestListener.current) {
      receiveRequestListener.current = () => {
        // Change the status AreRequest to false to true bcz the user get a new request
        setAreRequest(true);
      };
      socket.on("ReceiveRequest", receiveRequestListener.current);
    }

    return () => {
      if (receiveRequestListener.current) {
        socket.off("ReceiveRequest", receiveRequestListener.current);
        receiveRequestListener.current = null;
      }
    };
  }, [socket, setAreRequest]);

  useEffect(() => {
    const data = {
      MyId: userLog.userInfo.id,
    };
    async function getChats() {
      const res = await fetchDataPost(`${client}/api/chats`, data);

      if (res.status === 200) {
        setChatList(res.data);
      }
    }
    getChats();
  }, [setChatList]);

  //Found user info from db

  async function getUser(userId) {
    try {
      let res = await fetchDataPost(`${client}/api/getUserId`, {
        userId: userId,
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  // When the user get a new message change the Status to 1 in the chat
  // if the chat does not exist create a new card in the target user

  useEffect(() => {
    if (!getMessageListener.current) {
      getMessageListener.current = async (data) => {
        setChatList((prevChatList) => {
          const chatExists = prevChatList.some(
            (chat) => chat.chatId === data.chatId
          );

          // If the chat Exist change the Status to 1

          if (chatExists) {
            return prevChatList
              .map((chat) =>
                chat.chatId === data.chatId ? { ...chat, status: 1 } : chat
              )
              .sort((a, b) => b.status - a.status);
          } else {
            // Create new Object in the chatList
            let Id = data.senderId;
            getUser(Id).then((res) => {
              const newChat = {
                id: Id,
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
      };

      // Get the chat in the target id that have been gotten from the server
      socket.on("GetMessage", getMessageListener.current);
    }

    return () => {
      if (getMessageListener.current) {
        socket.off("GetMessage", getMessageListener.current);
        getMessageListener.current = null;
      }
    };
  }, [socket, setChatList]);


  const sortedChats = [...chatList].sort((a, b) => a.status - b.status);

  return (
    <div className={isInChat ? "IsInChat" : "IsHome"} id="SidebarChat">
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
          <ChatCard
            chats={sortedChats.reverse()}
            chatId={selectedChatId}
            setIsInChat={setIsInChat}
          />
        </div>
      )}
    </div>
  );
};

export default SidebarChat;
