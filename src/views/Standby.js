import { useEffect, useState } from "react";

import Assistant from "../components/UI/Assistant";

const Standby = () => {
  const [assistantHidden, setAssistantHidden] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setAssistantHidden(false);
    }, 1300)
  }, [])

  return (
    <div className='standby-container'>
      <Assistant hidden={assistantHidden} />
      <h1 className='standby-text'>Say "PictoSphere"
      <br />
      <br />
      to take a photo!</h1>
    </div>
  );
};

export default Standby;
