import WakeWordDetection from "../components/voice/WakeWordDetection";

const Standby = () => {
  return (
    <div className='standby-container'>
      <h1 className='standby-text'>Say "PictoSphere"
      <br />
      <br />
      to take a photo!</h1>
      <WakeWordDetection />
    </div>
  );
};

export default Standby;
