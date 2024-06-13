import React from "react";
import ChatIcon from "../assets/icons/Chat.svg";
import Solicitude from "../assets/icons/Solicitude.svg";
import Request from "../assets/icons/Request.svg";

const SidebarNavigation = ({ focus, areRequest }) => {
  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <div className="Options">
      <div
        onClick={() => handleNavigation("/")}
        style={{
          color: `${focus === "Home" ? "blue" : "grey"}`,
          cursor: "pointer",
        }}
        className="SidebarItem"
      >
        <img src={ChatIcon} width={30} alt="Chat Icon" />
        <p>Messages</p>
      </div>

      <div
        onClick={() => handleNavigation("/")}
        style={{
          color: `${focus === "Solicitude" ? "blue" : "grey"}`,
          cursor: "pointer",
        }}
        className="SidebarItem"
      >
        <img src={Solicitude} width={30} alt="Solicitude Icon" />
        <p>Solicitude</p>
      </div>

      <div
        onClick={() => handleNavigation("/ChatRequest")}
        style={{
          color: `${focus === "Request" ? "blue" : "grey"}`,
          cursor: "pointer",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="RequestIconText">
            <img src={Request} width={30} alt="Request Icon" />
            <p>Request</p>
          </div>
          {areRequest ? <div className="areRequest"></div> : null}
        </div>
      </div>
    </div>
  );
};

export default SidebarNavigation;
