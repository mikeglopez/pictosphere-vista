import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';


import './App.css';
import Standby from './views/Standby';
import Camera from './views/Camera';

const App = () => {
  const isPhotographing = useSelector(state => state.camera.isPhotographing);

  useEffect(() => {
    const preventRightClick = (event) => {
      event.preventDefault();
    };

    document.addEventListener('contextmenu', preventRightClick);

    return () => {
      document.removeEventListener('contextmenu', preventRightClick);
    };
  }, []);

  axios.get('/api/images');

  return (
    <div className='App'>
      {!isPhotographing ? <Standby /> : <Camera />}
    </div>
  );
};

export default App;
