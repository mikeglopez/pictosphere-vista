import { useState, useCallback, useEffect } from 'react';

const Slideshow = (props) => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const shuffleImages = imagesArr => {
    let currIndex = imagesArr?.length,
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
    const photosArr = props.photos;

    const shuffledPhotos = shuffleImages(photosArr);

    setImages(shuffledPhotos);
  }, [props.photos]);

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
      <img className='slideshow' src={`http://10.0.0.88:3000${props.photos[currentImageIndex]}`} alt='PictoSphere Capture' />
    </div>
  );
};

export default Slideshow;
