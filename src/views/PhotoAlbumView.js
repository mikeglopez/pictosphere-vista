import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { ToggleSlider }  from "react-toggle-slider";

const PhotoAlbumView = () => {
  const [images, setImages] = useState([]);
  const [isEnhanced, setIsEnhanced] = useState(true);

  const getImages = useCallback(async () => {
    const response = await axios.get('/api/images', {
      params: {
        process: isEnhanced ? 'processed' : 'original',
      },
    });
    setImages([...response.data]);
  }, [isEnhanced]);

  const toggleEnhanced = () => {
    setIsEnhanced(prevState => !prevState);
  }

  useEffect(() => {
    getImages();
  }, [getImages]);

  return (
    <div className='photo-album'>
      <div className='photo-album-header'>
        <p className='logo-pictosphere'>PictoSphere</p>
        <p className='logo-vista'>V I S T A</p>
      </div>
      <div className='photo-album-gallery'>
        <div className='enhance-toggle'>
          <p className='toggle-text'>Original</p>
          <ToggleSlider 
            onToggle={toggleEnhanced} 
            active={isEnhanced} 
            // barBackgroundColor='#f6f9c0'
            barBackgroundColorActive='#599c76'
          />
          <p className='toggle-text'>AI Enhanced</p>
        </div>
        <p className='gallery-instructions'>
          Press and hold, then select "save to photos"
        </p>
        {images.map(img => (<a key={img} href={`http://10.0.0.88:3000${img}`}><img className='gallery-photo' src={`http://10.0.0.88:3000${img}`} alt={img}/></a>))}
      </div>
    </div>
  )
}

export default PhotoAlbumView;