import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, []);

  const handleStart = () => {
    if (!isActive) {
      setIsActive(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
  };

  const handleStop = () => {
    setIsActive(false);
    clearInterval(intervalRef.current);
  };

  const handleReset = () => {
    setIsActive(false);
    clearInterval(intervalRef.current);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isActive) {
      setLaps([...laps, time]);
    }
  };

  const formatTime = (time) => {
    const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    const getSeconds = `0${seconds}`.slice(-2);
    const getMinutes = `0${minutes}`.slice(-2);
    const getHours = `0${hours}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}:${getMilliseconds}`;
  };

  return (
    <div className="container">
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="text-center p-4 rounded bg-light shadow">
      <h1 className="mb-4">Stopwatch</h1>
      <div className="display mb-4 p-3 border rounded  text-dark">
        <h2 className="display-1">{formatTime(time)}</h2>
      </div>
      <div className="buttons mb-4">
        {!isActive && time === 0 && (
          <button className="btn btn-success me-2 px-4" onClick={handleStart}>Start</button>
        )}
        {isActive && (
          <button className="btn btn-danger me-2 px-4" onClick={handleStop}>Stop</button>
        )}
        {!isActive && time !== 0 && (
          <button className="btn btn-primary me-2 px-4" onClick={handleStart}>Resume</button>
        )}
        {!isActive && time !== 0 && (
          <button className="btn btn-secondary me-2 px-4" onClick={handleReset}>Reset</button>
        )}
        {isActive && (
          <button className="btn btn-warning me-2 px-4" onClick={handleLap}>Lap</button>
        )}
      </div>
      <div className="laps">
        {laps.length > 0 && (
          <div className="mb-3">
            <h3 className="mb-3">Laps:</h3>
            {laps.map((lap, index) => (
              <div key={index} className="lap mb-2">
                <strong>Lap {index + 1}</strong>: {formatTime(lap)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
</div>

    
  
  
  );
};

export default Stopwatch;
