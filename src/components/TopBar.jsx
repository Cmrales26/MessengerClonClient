import icon from "../assets/Messenger.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { MenuComponent } from "./Menu";
import { useChat } from "../context/chatContex";
import { useNavigate } from "react-router-dom";

const TopBar = ({ userLog }) => {
  const { setChatRequests } = useChat();
  const navigator = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    setChatRequests([]);
    navigator("/login");
  };

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
        <MenuComponent
          options={[
            { option: "Edit profile" },
            { option: "Log out", method: logOut },
          ]}
          icon={<KeyboardArrowDownIcon />}
        />
      </div>
    </section>
  );
};

export default TopBar;
