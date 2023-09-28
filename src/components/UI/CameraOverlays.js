import { useSelector } from 'react-redux';

import Countdown from './Countdown';

const CameraOverlays = () => {
  const { count, hasRun } = useSelector(state => state.timer);

  return (
    <>
      {count > 0 && <Countdown />}
      <div className={(count === 0 && hasRun) ? 'flash' : ''} />
    </>
  );
};

export default CameraOverlays;
