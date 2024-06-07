import React, { useEffect, useState } from "react";
import MessengerIcon from "../assets/Messenger.svg";
import { Link, useNavigate } from "react-router-dom";
import { fetchDataPost } from "../utils/fetch";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

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

      let res = await fetchDataPost(
        "http://localhost:4040/api/loginUser",
        data
      );

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
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <section className="Login Form">
        <figure
          style={{
            gap: 50,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginBottom: "2rem",
          }}
        >
          <img src={MessengerIcon} alt="Messenger Icon" />
          <p style={{ fontSize: "20px" }}>Connect with your favorite people.</p>
        </figure>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <input
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              color: "black",
              letterSpacing: "1px",
              cursor: "pointer",
              border: "grey solid 1px",
              fontSize: "12px",
            }}
            type="text"
            onChange={(value) => {
              setUsername(value.target.value);
            }}
            placeholder="Username"
          />
          <input
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              color: "black",
              letterSpacing: "1px",
              cursor: "pointer",
              border: "grey solid 1px",
              fontSize: "12px",
            }}
            type="password"
            onChange={(value) => {
              setPassword(value.target.value);
            }}
            placeholder="Password"
          />

          <Link
            to={"/create"}
            style={{
              width: "100%",
              textAlign: "end",
              textDecoration: "none",
              color: "gray",
              fontSize: "12px",
            }}
          >
            Create Account
          </Link>

          <button
            style={{
              width: "60%",
              padding: "8px",
              borderRadius: "5px",
              outline: "none",
              color: "white",
              letterSpacing: "1px",
              cursor: "pointer",
              backgroundColor: "#1877F2",
              border: "none",
              fontSize: "12px",
            }}
            type="submit"
          >
            Continue
          </button>
          {error}
        </form>
      </section>
    </section>
  );
};

export default Login;
