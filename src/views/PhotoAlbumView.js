import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const PhotoAlbumView = () => {
  const [images, setImages] = useState([]);

  const getImages = useCallback(async () => {
    const response = await axios.get('/api/images');
    setImages([...response.data]);
  }, []);

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
        {/* This is the photo album */}
        {images.map(img => (<a key={img} href={`http://10.0.0.88:3000${img}`}><img className='gallery-photo' src={`http://10.0.0.88:3000${img}`} alt={img}/></a>))}
      </div>
    </div>
  )
}

export default PhotoAlbumView;