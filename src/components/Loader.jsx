import React, { useEffect, useState } from "react";

const Loader = ({ message, redirect, data }) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer >= 3) {
        return false;
      }
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleRedirect = () => {
    window.location.href = redirect;
  };

  return (
    <div id="loading">
      <h1>{message}</h1>
      <span className="loader"></span>
      {timer >= 3 && (
        <p
          onClick={() => {
            handleRedirect();
          }}
        >
          Is Taking so long, please click here to redirect {redirect}
        </p>
      )}
    </div>
  );
};

export default Loader;
