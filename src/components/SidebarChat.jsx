import React, { useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import { useNavigate } from "react-router-dom";
import { fetchDataPost } from "../utils/fetch";
import CardUserFound from "./CardUserFound";

const SidebarChat = ({ chatId }) => {
  const navigator = useNavigate();
  const [userFound, setUserFound] = useState();
  const [isSearch, setIsSearch] = useState(false);
  const [userNewChat, setUserNewChat] = useState();

  useEffect(() => {
    if (userFound === "") {
      setIsSearch(false);
    }
  }, [userFound]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSearch(true);

    let res = await fetchDataPost("http://localhost:4040/api/getUser", {
      username: userFound,
    });

    if (res.status === 404) {
      setUserNewChat("");
    }

    setUserNewChat(res.data);
  };

  const chatList = [
    // {
    //   idx: 0,
    //   name: "Shirley Duran",
    //   avatar:
    //     "https://scontent.fbaq6-1.fna.fbcdn.net/v/t39.30808-6/301643242_5291278820993749_4662011864101510598_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGd3342k2zqYFtW-jRmIgo4VT1DCIXBQd5VPUMIhcFB3u95XUpW2Evmmx2bqPWwNzoHvwJ1tINGkLaKOm9Kai3i&_nc_ohc=nQp53yDbKowQ7kNvgGc_Yg0&_nc_ht=scontent.fbaq6-1.fna&oh=00_AYAiuKU71CKHswMa2gahkigEG6bO6ClZe8gqJvZfCzcHMQ&oe=6667B6B8",
    //   who: "You",
    //   message: "Hola como estás",
    //   time: "1:00",
    // },
    // {
    //   idx: 1,
    //   name: "Liliana Navarro",
    //   avatar:
    //     "https://scontent.fbaq6-1.fna.fbcdn.net/v/t39.30808-6/410216657_7049978238397152_1644814934708724000_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEOeSKSLyoiwm9wft3hRC0e4WiaJZvmxyLhaJolm-bHIu75DppdZRBvFnOHZlLfMLGWazjGtHO3a8BguFLFfezF&_nc_ohc=Gb09LRV06CgQ7kNvgFrzJ6I&_nc_ht=scontent.fbaq6-1.fna&oh=00_AYCaRMARuZrP_ccu2NwkCWFhIDhf933vFUDkV5Cdhr0jBA&oe=6667B4DC",
    //   who: "You",
    //   message: "Hola Mundo",
    //   time: "10:00",
    // },
    {
      idx: 2,
      name: "Diana Vidal",
      avatar:
        "https://scontent.fbaq6-1.fna.fbcdn.net/v/t39.30808-6/345896927_1225334521424411_8548276109390854675_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHYxA-47z4X37TNE8CLtCdSqjbr6ys5_h2qNuvrKzn-HYeuxpBea-e6bLiNeuqEuylSoXgtymFlXaimaTw6YlzT&_nc_ohc=trWY-_IlhuAQ7kNvgGN27DB&_nc_ht=scontent.fbaq6-1.fna&oh=00_AYDlrHCpCo5mApiYCQ2-dKJwqvNTItF6JQ-mL5DP2E5kPw&oe=6667D075",
      who: "You",
      message:
        "Hola Amigo adjawdhkawhdkawhdkahwdkajhdwkjhawkdjhakwdhakjdwhkawdh",
      time: "10:00",
    },
  ];

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
      {/* <img src={userLog.avatarRoute} alt="" /> */}
      <h2 style={{ fontSize: "15px" }}>Chats</h2>

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
        <CardUserFound user={userNewChat} />
      ) : (
        <ChatCard chats={chatList} chatId={chatId} />
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
