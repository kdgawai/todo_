import React, { useState, useEffect } from 'react';
import './AnalogClock.css';

function AnalogClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Calculate the angles for clock hands
  const secondDegrees = (seconds / 60) * 360;
  const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
  const hourDegrees = ((hours % 12 + minuteDegrees / 360) / 12) * 360;

  const secondStyle = {
    transform: `rotate(${secondDegrees}deg)`,
  };

  const minuteStyle = {
    transform: `rotate(${minuteDegrees}deg)`,
  };

  const hourStyle = {
    transform: `rotate(${hourDegrees}deg)`,
  };

  return (
    <div className="analog-clock">
      <div className="clock-face">
        <div className="hand hour" style={hourStyle}></div>
        <div className="hand minute" style={minuteStyle}></div>
        <div className="hand second" style={secondStyle}></div>
        <div className="center-circle"></div>
      </div>
    </div>
  );
}

export default AnalogClock;
