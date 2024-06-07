import React, { useState } from "react";
import MessengerIcon from "../assets/Messenger.svg";
import { Link, useNavigate } from "react-router-dom";
import { fetchDataPost } from "../utils/fetch";

const Create = () => {
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [avatar, setAvatar] = useState("");

  const navigator = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result.split(",")[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      (username !== undefined && password !== undefined,
      name !== undefined && lastName !== undefined)
    ) {
      const data = {
        name: name.trim(),
        lastName: lastName.trim(),
        username: username.trim(),
        password: password,
        avatar: avatar,
      };

      let res = await fetchDataPost(
        "http://localhost:4040/api/createUser",
        data
      );

      if (res.status !== 200) {
        setError(res.error);
        return;
      }

      if (res.status === 200) {
        navigator("/login");
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
        alignItems: "center",
        height: "100vh",
      }}
    >
      <section
        className="Login Form"
        style={{
          width: "25%",
        }}
      >
        <figure
          style={{
            gap: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginBottom: "2rem",
          }}
        >
          <img
            src={avatar ? `data:image/png;base64,${avatar}` : null}
            alt="Messenger Icon"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "100%",
              objectFit: "contain",
            }}
          />

          <label
            style={{
              border: "1px solid #ccc",
              display: "inline-block",
              padding: "6px 12px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            <input
              type="file"
              accept=".jpg, .png, .webp"
              onChange={handleFileChange}
              style={{
                display: "none",
              }}
            />
            Upload Profile Photo
          </label>

          <p style={{ fontSize: "20px" }}>Create An Account</p>
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
          <div
            className=""
            style={{
              width: "100%",
              display: "flex",
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
                setName(value.target.value);
              }}
              placeholder="Name"
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
              type="text"
              onChange={(value) => {
                setLastName(value.target.value);
              }}
              placeholder="Last Name"
            />
          </div>
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
            to={"/login"}
            style={{
              width: "100%",
              textAlign: "end",
              textDecoration: "none",
              color: "gray",
              fontSize: "12px",
            }}
          >
            Login
          </Link>

          <button
            style={{
              width: "60%",
              padding: "5px",
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

export default Create;
