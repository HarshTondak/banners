import React, { useState, useEffect } from "react";

const CountdownTimer = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration / 1000);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          return duration / 1000;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration]);

  return <div className="countdown-timer">{timeLeft}s</div>;
};

export default CountdownTimer;
