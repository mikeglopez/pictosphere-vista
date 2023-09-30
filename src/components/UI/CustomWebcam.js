import Webcam from 'react-webcam';
import { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { toggleCamera, toggleFlashing } from '../../store/slices/cameraSlice';
import { resetCountdown } from '../../store/slices/timerSlice';

const CustomWebcam = () => {
  const [image, setImage] = useState(null);
  // const [processedImage, setProcessedImage] = useState(null);
  const { count, hasRun } = useSelector(state => state.timer);

  const dispatch = useDispatch();

  const webcamRef = useRef(null);
  const displayImageTime = 10; // in seconds


  const processImage = async (imgSrc) => {
    const response = await axios.post('/api/process', {
      image: imgSrc,
      enhance: false // !: Set this back to true to enhance the photo
    });

    // setProcessedImage(response.data) // *: Maybe use this later to build the photo gallery
  }

  // Take the picture and return to Standby
  useEffect(() => {
    if (image) {
      processImage(image); // Save the captured image and enhance, if toggled true

      setTimeout(() => {
        setImage(null);
        dispatch(resetCountdown());
        dispatch(toggleCamera());
      }, (displayImageTime * 1000)); // Delete the image and return to standby after displayImageTime in milliseconds
    }
  }, [ image, dispatch ]);

  // Capture the photo
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  // Play camera flash sound effect at the end of the countdown
  useEffect(() => {
    // TODO: Flash and Flash SFX are sometimes not playing at the right time on subsequent captures
    if (count < 1 && hasRun) {
      // Choose from pre-generated capture phrases
      const capturePhraseFile = Math.ceil(Math.random() * 4);
      const capturePhrase = new Audio(`/assets/audio/assistant/capture-phrases/capture-phrase-${capturePhraseFile}.mp3`);

      // TODO: Add chatgpt and elevenlabs generated capture phrase and toggle trigger for offline use

      capturePhrase.addEventListener('ended', () => {
        dispatch(toggleFlashing());
        setTimeout(() => {
          capture();
          new Audio('/assets/audio/camera-flash.mp3').play();
        }, 160);
      });

      capturePhrase.play();
    }
  }, [count, hasRun, capture, dispatch])

  return (
    <div className='webcam'>
      {image ? (
        <img src={image} alt='webcam' />
      ) : (
        <Webcam
          mirrored
          screenshotFormat='image/png'
          screenshotQuality={1}
          ref={webcamRef}
        />
      )}
    </div>
  );
};

export default CustomWebcam;
