import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import './App.css';
import Standby from './views/Standby';
import Camera from './views/Camera';

const App = () => {
  const dispatch = useDispatch();
  const isPhotographing = useSelector(state => state.camera.isPhotographing);
  const hasError = useSelector(state => state.error.hasError);
  const apiUrl = process.env.REACT_APP_EC2_INSTANCE;

  useEffect(() => {
    axios.post(`http://${apiUrl}/api/flux-capacitor/start`)
      .then(response => {
      })
      .catch(error => {
        console.error('Error starting light fluxing:', error);
      });

    const preventRightClick = (event) => {
      event.preventDefault();
    };

    document.addEventListener('contextmenu', preventRightClick);

    return () => {
      document.removeEventListener('contextmenu', preventRightClick);
      axios.post(`http://${apiUrl}/api/flux-capacitor/stop`)
        .then(response => {
        })
        .catch(error => {
          console.error('Error stopping light fluxing:', error);
        })
    };
  }, [dispatch, apiUrl]);

  axios.get(`http://${apiUrl}/api/images`);

  return (
    <div className='App'>
    {!hasError && (!isPhotographing ? <Standby /> : <Camera />)}
    </div>
  );
};

export default App;
