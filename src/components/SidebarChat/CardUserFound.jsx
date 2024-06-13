import { v4 as uuidv4 } from "uuid";
import { fetchDataPost } from "../../utils/fetch";
import { socket } from "../../utils/SocketConfig";

const CardUserFound = ({ user, loading, userLog, setUserFound }) => {
  const handelNewRequest = async () => {
    const today = new Date();
    const date = today.toISOString().split("T")[0];

    const data = {
      RequestId: uuidv4(),
      SenderId: userLog.userInfo.id,
      TargetId: user.data.id,
      name: userLog.userInfo.name,
      lastname: userLog.userInfo.lastname,
      avatar: userLog.avatarRoute,
      date: date,
    };

    let res = await fetchDataPost(
      "http://localhost:4040/api/chatRequest",
      data
    );

    if (res.status === 208) {
      alert("You already send a chat request to this person.");
      setUserFound("");
      document.querySelector("#userFound").value = "";
      return;
    }

    if (res.status === 200) {
      alert("Request sent successfully");
      socket.emit("SendRequest", data);
      setUserFound("");
      document.querySelector("#userFound").value = "";
      return;
    }
  };

  if (loading) {
    return <h1>Finding user</h1>;
  }

  return (
    <section>
      {user.data === "not found" ? (
        <h2>User not found</h2>
      ) : (
        <section>
          <section id="card-userFound">
            <h1>User Found</h1>
            <img src={user.avatar} alt="" />
            <h3>
              {user.data.name} {user.data.lastname}
            </h3>

            <button
              onClick={() => {
                handelNewRequest();
              }}
            >
              Send chat Request
            </button>
          </section>
        </section>
      )}
    </section>
  );
};

export default CardUserFound;
