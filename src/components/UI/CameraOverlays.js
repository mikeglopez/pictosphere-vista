import { useSelector } from 'react-redux';

import Countdown from './Countdown';

const CameraOverlays = () => {
  const count = useSelector(state => state.timer.count);
  // TODO: Add another var to timerSlice to track if countdown has run
  // *: If count is zero and countdown has run display Assistant/play say cheese message (generate as soon as countdown starts so it's ready)
  // *: Probably need to reset store after successful capture
  // *: Refactor the flash: Play audio, make sure it finishes before flashing?? -> 5, 4, 3, 2, 1 ..... 'say cheese'... if audio is done playing, flash/capture (with flash sfx?)

  return (
    <>
      {count > 0 && <Countdown />}
      <div className={count === 0 ? 'flash' : ''} />
    </>
  );
};

export default CameraOverlays;
