require('dotenv').config('../../.env');
const AWS = require('aws-sdk');
const imageDateFilter = require('./image_date_filter');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2'
});

const s3 = new AWS.S3();

const getFileName = (key) => {
  const parts = key.split('/');
  return parts[parts.length - 1];
};

const getImages = async (version) => {
  try {
    const bucketName = 'pictosphere-prod';
    const folder = (version === 'original') ? 'captures/original' : 'captures/processed';

    const s3Objects = await s3.listObjectsV2({
      Bucket: bucketName,
      Prefix: folder
    }).promise();
    const imageObjects = s3Objects.Contents.filter(obj => obj.Key.endsWith('.png'));

    //  Filter the images based on date
    const filteredImages = imageObjects.filter(obj => imageDateFilter(getFileName(obj.Key)));
    // Don't filter the images
    // const filteredImages = imageObjects.filter(obj => getFileName(obj.Key));

    return filteredImages.map(obj => `${process.env.REACT_APP_S3}/${obj.Key}`);
  } catch (err) {
    console.error('Error getting images from S3:', err);
  }
};

module.exports = getImages;
