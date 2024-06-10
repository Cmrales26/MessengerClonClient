import React from "react";
import icon from "../assets/Messenger.svg";
import { useNavigate } from "react-router-dom";
const TopBar = ({ userLog }) => {
  const navigate = useNavigate();
  return (
    <section
      style={{
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.25)",
        borderBottom: "1px solid grey",
      }}
    >
      <div
        className=""
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
        }}
        onClick={() => {
          navigate("/", 0);
        }}
      >
        <img
          src={icon}
          alt=""
          style={{
            width: "30px",
          }}
        />
        <h2 style={{ fontSize: "15px" }}>Messenger</h2>
      </div>
      <div
        className=""
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <p
          style={{
            textDecoration: "none",
            fontSize: "12px",
          }}
        >
          {userLog.userInfo.name} {userLog.userInfo.lastname}
        </p>
        <img
          src={userLog.avatarRoute}
          alt=""
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    </section>
  );
};

export default TopBar;
