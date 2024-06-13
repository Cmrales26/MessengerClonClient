import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchDataPost } from "../utils/fetch";

import MessengerIcon from "../assets/Messenger.svg";
import { useChat } from "../context/chatContex";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const { client } = useChat();

  const navigator = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigator("/chat");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username !== undefined && password !== undefined) {
      const data = {
        username: username,
        password: password,
      };

      let res = await fetchDataPost(`${client}/api/loginUser`, data);

      if (res.status !== 200) {
        setError(res.error);
        return;
      }

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        navigator("/chat");
        return;
      }

      setError(res.error);
    } else {
      setError("All fields are required");
    }
  };
  return (
    <section id="Login">
      <section className="Login_Form">
        <figure>
          <img src={MessengerIcon} alt="Messenger Icon" />
          <h1>Connect with your favorite people.</h1>
        </figure>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(value) => {
              setUsername(value.target.value);
            }}
            placeholder="Username"
          />
          <input
            type="password"
            onChange={(value) => {
              setPassword(value.target.value);
            }}
            placeholder="Password"
          />

          <Link to={"/create"}>Create Account</Link>

          <button id="ActionAuthBtn" style={{}} type="submit">
            Continue
          </button>
          {error}
        </form>
      </section>
    </section>
  );
};

export default Login;
