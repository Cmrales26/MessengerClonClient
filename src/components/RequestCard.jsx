import React from "react";

const RequestCard = ({ request, handleDecline, handleAccept }) => {
  return (
    <div
      style={{
        marginTop: "1rem",
      }}
    >
      {request.map((Request, idx) => (
        <div
          className="Request-card"
          key={idx}
          style={{
            backgroundColor: `${Request.Status === "0" ? "#fafafa" : "white"}`,
            margin: ".5rem 0rem",
            borderRadius: "4px",
          }}
        >
          <section
            className="Request"
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              width: "100%",
              padding: ".4rem",
            }}
          >
            <img
              src={Request.avatar}
              width={45}
              height={45}
              style={{
                borderRadius: "100%",
                objectFit: "fill",
              }}
              alt=""
            />

            <div
              className=""
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <article style={{ width: "100%" }}>
                <h3 style={{ fontSize: "12px" }}>
                  {Request.name} {Request.lastname}
                </h3>{" "}
                <p
                  style={{
                    fontSize: "10px",
                    color: "grey",
                  }}
                >
                  Want to talk with you
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: "10px", color: "gray" }}>
                    {Request.RequestDate}
                  </span>
                </div>
              </article>
              <div
                className="controllers"
                style={{
                  display: "flex",
                  gap: ".4rem",
                }}
              >
                <button
                  style={{
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: "transparent",
                  }}
                  onClick={() => handleAccept(Request)}
                >
                  ✅
                </button>
                <button
                  style={{
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: "transparent",
                  }}
                  onClick={() => handleDecline(Request.RequestId)}
                >
                  ❌
                </button>
              </div>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
};

export default RequestCard;
