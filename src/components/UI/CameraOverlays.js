import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import Assistant from './Assistant';
import Countdown from './Countdown';

const CameraOverlays = () => {
  const [assistantHidden, setAssistantHidden] = useState(true)
  const { count, hasRun } = useSelector(state => state.timer);
  const { isFlashing } = useSelector(state => state.camera);

  const countRef = useRef(count);

  useEffect(() => {
    countRef.current = count;
    if (countRef.current >= 5 || countRef.current < 1) {
      setAssistantHidden(isHidden => !isHidden);
    }
  }, [count]);

  return (
    <>
      <Assistant hidden={assistantHidden} />
      {count > 0 && <Countdown />}
      <div id='camera-flash' className={(count === 0 && hasRun && isFlashing) ? 'flash' : ''} />
    </>
  );
};

export default CameraOverlays;
