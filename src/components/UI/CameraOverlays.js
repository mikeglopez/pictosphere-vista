import { useSelector } from 'react-redux';

import Countdown from './Countdown';

const CameraOverlays = () => {
  const { count, hasRun } = useSelector(state => state.timer);
  const { isFlashing } = useSelector(state => state.camera);

  return (
    <>
      {count > 0 && <Countdown />}
      <div id='camera-flash' className={(count === 0 && hasRun && isFlashing) ? 'flash' : ''} />
    </>
  );
};

export default CameraOverlays;
