import React from "react";
import { Link } from "react-router-dom";

const SidebarNavigation = ({ focus, areRequest }) => {
  return (
    <div
      className="Options"
      style={{
        fontSize: "12px",
        display: "flex",
        gap: "1rem",
        marginTop: "5px",
      }}
    >
      <Link
        to={"/"}
        style={{
          textDecoration: "none",
          color: `${focus === "Home" ? "blue" : "grey"}`,
        }}
      >
        Messages
      </Link>
      <Link
        style={{
          textDecoration: "none",
          color: `${focus === "Solicitude" ? "blue" : "grey"}`,
        }}
      >
        Solicitude
      </Link>
      <Link
        to={"/ChatRequest"}
        style={{
          textDecoration: "none",
          color: `${focus === "Request" ? "blue" : "grey"}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <p>Request</p>
          {areRequest ? (
            <div
              style={{
                width: "7px",
                height: "7px",
                backgroundColor: "red",
                color: "white",
                borderRadius: "10px",
                marginLeft: "5px",
              }}
            ></div>
          ) : null}
        </div>
      </Link>
    </div>
  );
};

export default SidebarNavigation;
