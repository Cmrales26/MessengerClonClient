import React from "react";
import { Link } from "react-router-dom";

const SidebarNavigation = ({ focus, nMessages, nSolicitude, nRequest }) => {
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
        <div className="">
          <p>
            Request{" "}
            <span
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "0rem .5rem",
                borderRadius: "10px",
                marginLeft: "5px",
              }}
            >
              {nRequest}
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default SidebarNavigation;
