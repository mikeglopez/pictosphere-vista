import { useSelector } from 'react-redux';

const Countdown = () => {
  const count = useSelector(state => state.timer.count);

  return (
    <div className='countdown-container'>
      <h1 className='countdown-timer'>{count}</h1>
    </div>
  );
};

export default Countdown;
