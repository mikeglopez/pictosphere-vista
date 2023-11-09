// import WakeWordDetection from '../components/voice/WakeWordDetection';
import Slideshow from '../components/UI/Slideshow';

const Standby = () => {
  return (
    <div className='standby-background'>
      <div className='standby-container'>
        <h1 className='standby-text'>Say "PictoSphere"</h1>
        <Slideshow />
        <h1 className='standby-text'>to take a photo!</h1>
        {/* <WakeWordDetection /> */}
      </div>
    </div>
  );
};

export default Standby;
