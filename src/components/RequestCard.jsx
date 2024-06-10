import React from "react";

const RequestCard = ({ request }) => {
  return (
    <div
      style={{
        marginTop: "1rem",
      }}
    >
      {request.map((Request) => (
        <div className="Request-card" key={Request.id}>
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
          </section>
        </div>
      ))}
    </div>
  );
};

export default RequestCard;
