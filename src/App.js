import { useSelector } from 'react-redux';
import axios from 'axios';

import './App.css';
import Standby from './views/Standby';
import Camera from './views/Camera';

const App = () => {
  const isPhotographing = useSelector(state => state.camera.isPhotographing);

  axios.get('/api/images');

  return (
    <div className='App'>
      {!isPhotographing ? <Standby /> : <Camera />}
    </div>
  );
};

export default App;
