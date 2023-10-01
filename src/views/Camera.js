import { useSelector, useDispatch } from 'react-redux';
import { useRef, useEffect } from 'react';

import CameraOverlays from "../components/UI/CameraOverlays";
import CustomWebcam from "../components/UI/CustomWebcam";

import {
  decrementCount,
  stopCountdown
} from '../store/slices/timerSlice';

const Camera = () => {
  const dispatch = useDispatch();
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

  return (
    <div>
      <CameraOverlays />
      <CustomWebcam />
    </div>
  )
}

export default Camera;