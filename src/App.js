import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import './App.css';
import Standby from './views/Standby';
import Camera from './views/Camera';

import { toggleCamera } from './store/slices/cameraSlice';
import { startCountdown } from './store/slices/timerSlice';

const App = () => {
  const dispatch = useDispatch();
  const isPhotographing = useSelector(state => state.camera.isPhotographing);
  const hasError = useSelector(state => state.error.hasError);

  const handleClick = () => {
    dispatch(toggleCamera());
    setTimeout(() => {
      dispatch(startCountdown());
    }, 2000);
  }

  axios.get('/api/images');

  return (
    <div className='App' onClick={handleClick}>
      {!hasError && (!isPhotographing ? <Standby /> : <Camera />)}
    </div>
  );
};

export default App;
