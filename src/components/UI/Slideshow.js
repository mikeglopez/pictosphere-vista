import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const Slideshow = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const shuffleImages = imagesArr => {
    let currIndex = imagesArr.length,
      randIndex;

    while (currIndex > 0) {
      randIndex = Math.floor(Math.random() * currIndex);
      currIndex--;

      [imagesArr[currIndex], imagesArr[randIndex]] = [
        imagesArr[randIndex],
        imagesArr[currIndex]
      ];
    }

    return imagesArr;
  };

  const getImages = useCallback(async () => {
    const response = await axios.get('/api/images');
    const photosArr = [...response.data];

    const shuffledPhotos = shuffleImages(photosArr);

    setImages(shuffledPhotos);
  }, []);

  useEffect(() => {
    getImages();
  }, [getImages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, [images]);

  return (
    <div className='slideshow-container'>
      <img className='slideshow' src={images[currentImageIndex]} alt='pictoSphere capture' />
    </div>
  );
};

export default Slideshow;
