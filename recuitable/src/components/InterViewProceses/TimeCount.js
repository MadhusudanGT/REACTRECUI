import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import LandingPage from "../ApplicantLandingPage/LandingPage"
function MyTimer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });
  let history = useHistory();
const handleCount=()=>{
  console.log(minutes+':'+seconds);
  history.push("/LandingPage");
}



  return (
    <div style={{textAlign: 'center'}}>
      <h1>COMPLETE WITH IN 30 MIN</h1>
      <div style={{fontSize: '30px'}}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        {localStorage.setItem("minutes",minutes),
  localStorage.setItem("seconds",seconds)}
      </div>
      <p>{isRunning ? 'Running' : 'Not running'}</p>
      {/* <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button> */}
      <Button onClick={resume} onClick={handleCount} color={'primary'}>COMPLETE TEST</Button>
      {/* <button onClick={() => {
        // Restarts to 5 minutes timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + 300);
        restart(time)
      }}>Restart</button> */}
    </div>
  );
}

export default function TimeCounter() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 1800); // 30 minutes timer i seted
  return (
    <div>
      <MyTimer expiryTimestamp={time} />
    </div>
  );
}