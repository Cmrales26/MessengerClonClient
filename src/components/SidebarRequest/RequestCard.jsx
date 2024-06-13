import Accept from "../../assets/icons/Accept.svg";
import Decline from "../../assets/icons/Decline.svg";

const RequestCard = ({ request, handleDecline, handleAccept }) => {
  return (
    <div
      style={{
        marginTop: "1rem",
      }}
    >
      {request.map((Request, idx) => (
        <div className="Request-card" key={idx}>
          <section className="Request">
            <img
              id="SenderAvatar"
              src={Request.avatar}
              alt="Request Profile Picture"
            />

            <div className="CardRequestInfo">
              <article>
                <h3>
                  {Request.name} {Request.lastname}
                </h3>

                <div className="date">
                  <p>Want to talk with you</p>
                  <span>{Request.RequestDate}</span>
                </div>
              </article>

              <div className="controllers">
                <button onClick={() => handleAccept(Request)}>
                  <img src={Accept} alt="Accept Request" width={20} />
                </button>
                <button
                  onClick={() => {
                    handleDecline(Request.RequestId);
                  }}
                >
                  <img src={Decline} alt="Accept Request" width={20} />
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
