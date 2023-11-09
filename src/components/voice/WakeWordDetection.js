import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { usePorcupine } from '@picovoice/porcupine-react';

import pictosphereKeywordModel from './pictosphere';
import modelParams from './porcupine_params';

import { toggleCamera } from '../../store/slices/cameraSlice';
import { startCountdown } from '../../store/slices/timerSlice';

export default function WakeWordDetection() {
  const dispatch = useDispatch();

  const {
    keywordDetection,
    // isLoaded,
    // isListening,
    error,
    init,
    start,
    stop
    // release
  } = usePorcupine();

  const initEngine = useCallback(() => {
    new Promise(() => {
      init(
        `${process.env.REACT_APP_PICOVOICE_ACCESS_KEY}`,
        {
          base64: pictosphereKeywordModel,
          label: 'PictoSphere'
        },
        { base64: modelParams }
      );
    }).then(() => {
      start()
    }).then(() => {
      console.log('thing')
    });
  }, [init, start]);

  const beginCapture = useCallback(() => {
    stop();
    dispatch(toggleCamera());
    setTimeout(() => {
      dispatch(startCountdown());
    }, 2000);
  }, [dispatch, stop]);

  useEffect(() => {
    initEngine();
  }, [initEngine]);

  useEffect(() => {
    if (error) {
      console.log('picovoice error:', error)
    }
  }, [error])

  useEffect(() => {
    if (keywordDetection !== null) {
      console.log('WAKE WORD detected!');
      beginCapture();
    }
  }, [keywordDetection, beginCapture]);

  useEffect(() => {
    if (error) console.error('picovoice error:', error)
  }, [error])

  return <></>;
}
