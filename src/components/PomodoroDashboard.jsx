import '../scss/pomodoro-dashboard.scss';
import { useState, useRef } from 'react';

const PomodoroDashboard = () => {
  const [selectedElement, setSelectedElement] = useState('pomodoro');
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const id = useRef();

  const handleIsRunning = () => {
    setIsRunning(!isRunning);
  };

  const handleRemainingTimeChange = () => {
    id.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          setMinutes((prevMinutes) => {
            if (prevMinutes === 0) {
              
              alert('Time is up!');
              clearInterval(id.current);
              handleIsRunning();
              handleReset();
              return prevMinutes; // No change in minutes if time is up
            } else {
              return prevMinutes - 1; // Decrease minutes by 1 if there is time left
            }
          });
          return 59; // Set seconds to 59 when minutes decrement
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);
  };

  const handleStartPause = () => {
    if (isRunning) {
      clearInterval(id.current);
    } else {
      handleRemainingTimeChange();
    }
    handleIsRunning();
  };

  const handleReset = () => {
    clearInterval(id.current);
    selectedElement === 'pomodoro'? setMinutes(25) : selectedElement === 'short'? setMinutes(15) : setMinutes(5);
    setSeconds(0);
    handleIsRunning();
  };


  return (
    <div className='pomodoro-dashboard-container'>
      <ul>
        <li>
          <button onClick={() => {
            setSelectedElement('pomodoro');
            setMinutes(25);
          }}>
            Pomodoro
          </button>
        </li>
        <li>
          <button onClick={() => {
            setSelectedElement('short');
            setMinutes(15);
          }}>
            Short Break
          </button>
        </li>
        <li>
          <button onClick={() => {
            setSelectedElement('long');
            setMinutes(5);
          }}>
            Long Break
          </button>
        </li>
      </ul>
      <div className='time-container'>
        {selectedElement === 'pomodoro' && <><h1>{minutes}:</h1> <h1>{seconds < 10 ? '0' + seconds : seconds}</h1></>}
        {selectedElement === 'long' && <><h1>{minutes}:</h1> <h1>{seconds < 10 ? '0' + seconds : seconds}</h1></>}
        {selectedElement === 'short' && <><h1>{minutes}:</h1> <h1>{seconds < 10 ? '0' + seconds : seconds}</h1></>}
      </div>
      <div className='button-container'>
        <button className='start-button' onClick={handleStartPause}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button className='reset-button' onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroDashboard;
