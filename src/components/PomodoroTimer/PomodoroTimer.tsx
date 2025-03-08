import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './PomodoroTimer.css';

interface TimerOption {
  label: string;
  minutes: number;
}

const PomodoroTimer: React.FC = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [timerOption, setTimerOption] = useState<TimerOption>({
    label: '25 Minutes',
    minutes: 25,
  });

  const timerOptions: TimerOption[] = [
    { label: '5 M', minutes: 5 },
    { label: '10 M', minutes: 10 },
    { label: '25 M', minutes: 25 },
    // Added for custom time input
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval!);
            setIsActive(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
        const totalSeconds = minutes * 60 + seconds;
        const remainingSeconds = timerOption.minutes * 60 - totalSeconds; //Use selected timerOption
        const progress = (remainingSeconds / (timerOption.minutes * 60)) * 100;
        setPercentage(100 - progress);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval!);
    }
    return () => clearInterval(interval!);
  }, [isActive, seconds, minutes, timerOption]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTimerOption({ label: '25 Minutes', minutes: 25 });
    setMinutes(25);
    setSeconds(0);
    setIsActive(false);
    setPercentage(0);
  };

  const handleTimerOptionChange = (option: TimerOption) => {
    setTimerOption(option);
    setMinutes(option.minutes);
    setSeconds(0);
  };

  const styles = buildStyles({
    strokeLinecap: 'butt',
    rotation: 0.25,
    pathColor: `#007bff`,
    textColor: '#007bff',
    trailColor: '#d6d6d6',
  });

  return (
    <div className="pomodoro-timer">
      <div className="progress-bar">
        <CircularProgressbar
          value={percentage}
          text={`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
          styles={styles}
        />
      </div>
      <div className="controls">
        <div className="timer-options">
          {timerOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => handleTimerOptionChange(option)}
              className="border border-gray-400 text-white hover:text-gray-900 hover:border-gray-600 px-2 py-1 rounded-md text-sm"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <div className="controls">
        <button
          onClick={toggleTimer}
          className=" hover:text-gray-900 hover:border-gray-600 rounded-full"
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className=" hover:text-gray-900 hover:border-gray-600 rounded-full"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
