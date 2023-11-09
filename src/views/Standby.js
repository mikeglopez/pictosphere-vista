import { useDispatch } from 'react-redux';

// import WakeWordDetection from '../components/voice/WakeWordDetection';
import Slideshow from '../components/UI/Slideshow';

import { toggleCamera } from '../store/slices/cameraSlice';
import { startCountdown } from '../store/slices/timerSlice';

const Standby = () => {
  const dispatch = useDispatch();

  // *: Temporarily add this back, while voice activation is timed out
  const handleClick = () => {
    dispatch(toggleCamera());
    setTimeout(() => {
      dispatch(startCountdown());
    }, 2000);
  }

  return (
    <div className='standby-background'>
      <div className='standby-container' onClick={handleClick}>
        <h1 className='standby-text'>Say "PictoSphere"</h1>
        <Slideshow />
        <h1 className='standby-text'>to take a photo!</h1>
        {/* <WakeWordDetection /> */}
      </div>
    </div>
  );
};

export default Standby;
