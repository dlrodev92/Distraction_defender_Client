import '../scss/pomodoro-dashboard.scss';
import { useState, useRef, useEffect } from 'react';
import startSound from '../assets/sound/start.mp3';
import endSound1 from '../assets/sound/endSound1.mp3';
import endSound2 from '../assets/sound/endSound2.mp3';
import endSound3 from '../assets/sound/endSound3.mp3';
import endSound4 from '../assets/sound/endSound4.mp3';
import endSound5 from '../assets/sound/endSound5.mp3';

const PomodoroDashboard = () => {
  const [selectedElement, setSelectedElement] = useState('pomodoro');
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const id = useRef();
  const endSounds = [endSound1, endSound2, endSound3, endSound4, endSound5];

  const startAudio = new Audio(startSound);
  const endAudio = new Audio();

  useEffect(() => {
    startAudio.load();
    endAudio.load();
  }, []);

  const handleIsRunning = () => {
    setIsRunning(!isRunning);
  };

  const playStartSound = () => {
    startAudio.play();
  };

  const playRandomEndSound = () => {
    const randomIndex = Math.floor(Math.random() * endSounds.length);
    endAudio.src = endSounds[randomIndex];
    endAudio.play();
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
              playRandomEndSound();
              return prevMinutes;
            } else {
              return prevMinutes - 1;
            }
          });
          return 59;
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);
  };

  const handleStartPause = () => {
    if (!isRunning) {
      playStartSound();
    }
    if (isRunning) {
      clearInterval(id.current);
    } else {
      handleRemainingTimeChange();
    }
    handleIsRunning();
  };

  const handleReset = () => {
    clearInterval(id.current);
    selectedElement === 'pomodoro' ? setMinutes(25) : selectedElement === 'short' ? setMinutes(15) : setMinutes(5);
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
            Long Break
          </button>
        </li>
        <li>
          <button onClick={() => {
            setSelectedElement('long');
            setMinutes(5);
          }}>
            Short Break
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
