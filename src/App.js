import { useSelector, useDispatch } from 'react-redux';
import { useRef, useEffect } from 'react';

import './App.css';
import Standby from './views/Standby';
import Camera from './views/Camera';

import { toggleCamera } from './store/slices/cameraSlice';
import {
  startCountdown,
  decrementCount,
  stopCountdown
} from './store/slices/timerSlice';

const App = () => {
  const dispatch = useDispatch();
  const isPhotographing = useSelector(state => state.camera.isPhotographing);
  const count = useSelector(state => state.timer.count);
  const isRunning = useSelector(state => state.timer.isRunning);

  const countRef = useRef(count);

  useEffect(() => {
    countRef.current = count;
    if (countRef.current > 0) {
      new Audio(`/assets/audio/assistant/countdown/${countRef.current}.mp3`).play()
    }
  }, [count]);

  // Start the countdown
  useEffect(() => {
    if (isRunning) {
      const countdownInterval = setInterval(() => {
        const currentCount = countRef.current;
        dispatch(decrementCount());
        if (currentCount <= 1) {
          clearInterval(countdownInterval);
          dispatch(stopCountdown());
        }
      }, 1400);
      return () => {
        clearInterval(countdownInterval);
      };
    }
  }, [dispatch, isRunning]);

  const handleClick = () => {
    dispatch(toggleCamera());
    setTimeout(() => {
      dispatch(startCountdown());
    }, 2000)
  };

  return (
    <div className='App' onClick={handleClick}> {/* Temporary countdown trigger */}
      {!isPhotographing ? <Standby /> : <Camera />}
    </div>
  );
};

export default App;
