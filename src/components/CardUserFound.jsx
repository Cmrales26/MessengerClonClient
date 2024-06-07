import React, { useEffect, useState } from "react";

const CardUserFound = ({ user }) => {
  const [loading, setLoading] = useState(true);

  console.log(user);

  useEffect(() => {
    if (user === undefined) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [user]);
  if (loading) {
    return <h1>Finding user</h1>;
  }

  console.log(user.data);
  return (
    <section>
      {user.data === "not found" ? (
        <h2>User not found</h2>
      ) : (
        <section>
          <h1
            style={{ textAlign: "center", marginTop: "1rem", fontSize: "20px" }}
          >
            User Found
          </h1>
          <section
            style={{
              marginTop: "1rem",
              // border: "1px solid",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              padding: "1rem",
              // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              borderRadius: "4px",
            }}
          >
            <img
              src={user.avatar}
              alt=""
              style={{ width: "100px", borderRadius: "100%" }}
            />
            <h3 style={{ fontSize: "15px", marginTop: "1rem" }}>
              {user.data.name} {user.data.lastname}
            </h3>

            <button
              style={{
                width: "100%",
                border: "none",
                backgroundColor: "#0084ff",
                color: "white",
                padding: ".5rem",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: "bold",
                margin: "1rem 0",
                borderRadius: "4px",
              }}
            >
              Star Chatting
            </button>
          </section>
        </section>
      )}
    </section>
  );
};

export default CardUserFound;
