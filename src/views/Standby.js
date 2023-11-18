import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

// import WakeWordDetection from '../components/voice/WakeWordDetection';
import Slideshow from '../components/UI/Slideshow';
import Assistant from '../components/UI/Assistant';

import { toggleCamera } from '../store/slices/cameraSlice';
import { startCountdown } from '../store/slices/timerSlice';

const Standby = () => {
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);

  const handleClick = () => {
    dispatch(toggleCamera());
    axios.post('/api/flux-capacitor/speed', { speed: 'fast' })
      .then((response) => console.log(response.data))
      .catch((error) => console.error('Error:', error));
    setTimeout(() => {
      dispatch(startCountdown());
    }, 2000);
  }

  const getImages = useCallback(async () => {
    const response = await axios.get('/api/images');
    setImages([...response.data]);
  }, []);

  useEffect(() => {
    getImages();
  }, [getImages]);

  return (
    <>
      <Assistant version='b' hidden={false} />
      <div className='standby-bg'>
        <div className='standby-top'>
          <div className='standby-display'>
            {images.length ? <Slideshow photos={images} /> : <div className='standby-instruction-text'>
              <p className='standby-instruction'>
                Press the Button
              </p>
              <p className='standby-instruction'>
                To Take a Photo!
              </p>
            </div>}
          </div>
        </div>
        <div className='standby-bottom'>
          <div className='bottom-col first-column'></div>
          <div className='bottom-col second-column'>
            <p className='standby-title'>PictoSphere</p>
            <p className='standby-text'>V I S T A</p>
          </div>
          <div className='bottom-col third-column'>
            <div className='standby-text'>
              <p>Scan to Download</p>
              <p>Your Photos!</p>
            </div>
            <div className='qr-code'>
              <img src='assets/images/standby/album-qr.png' alt='QR Code to PhotoAlbum' />
            </div>
          </div>
        </div>
        <div
          className='start-btn'
          onClick={handleClick}
        ></div>
      </div>
    </>
  );
};

export default Standby;
