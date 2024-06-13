import React from "react";
import icon from "../assets/Messenger.svg";
const TopBar = ({ userLog }) => {
  return (
    <section id="TopBar">
      <div
        className="LeftSide"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <img src={icon} alt="" width={30} />
        <h2>Messenger</h2>
      </div>
      <div className="RightSide">
        <p>
          {userLog.userInfo.name} {userLog.userInfo.lastname}
        </p>
        <img src={userLog.avatarRoute} alt="User Avatar" />
      </div>
    </section>
  );
};

export default TopBar;
