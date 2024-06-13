import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchDataPost } from "../utils/fetch";
import UploadIcon from "../assets/icons/Upload.svg";

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
    <section id="Create">
      <section
        className="Login Form"
        style={{
          width: "25%",
        }}
      >
        <figure>
          <img
            src={avatar ? `data:image/png;base64,${avatar}` : null}
            alt="Messenger Icon"
          />

          <label>
            <input
              type="file"
              accept=".jpg, .png, .webp"
              onChange={handleFileChange}
              style={{
                display: "none",
              }}
            />
            <div>
              <p>Upload Profile Photo</p>
              <img src={UploadIcon} alt="UploadIcon" />
            </div>
          </label>

          <p style={{ fontSize: "20px" }}>Create An Account</p>
        </figure>

        <form onSubmit={handleSubmit}>
          <div className="name-last">
            <input
              type="text"
              onChange={(value) => {
                setName(value.target.value);
              }}
              placeholder="Name"
            />
            <input
              type="text"
              onChange={(value) => {
                setLastName(value.target.value);
              }}
              placeholder="Last Name"
            />
          </div>
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

          <Link to={"/login"}>Login</Link>

          <button id="ActionAuthBtn" type="submit">
            Continue
          </button>
          {error}
        </form>
      </section>
    </section>
  );
};

export default Create;
