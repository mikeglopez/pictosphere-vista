require('dotenv').config('../../.env');
const AWS = require('aws-sdk');
const fs = require('fs');
const axios = require('axios');
const Jimp = require('jimp');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2'
});

const s3 = new AWS.S3();

const exportFile = async (savePathBase, imgData, imgName, version) => {
  try {
    let base64Data;

    if (version === 'ORIGINAL') {
      // For downloading the original captured image
      base64Data = imgData.replace(/^data:image\/png;base64,/, '');
    } else if (version === 'PROCESSED') {
      // Download the image from the Remini URL
      try {
        const response = await axios.get(imgData, { responseType: 'arraybuffer' });
        base64Data = Buffer.from(response.data, 'binary').toString('base64');
      } catch (err) {
        console.error(`Error downloading the processed image: ${err}`);
        throw err;
      }
    }

    const savePath = `${savePathBase}/${imgName}.png`;

    // Use Jimp to open the image
    const image = await Jimp.read(Buffer.from(base64Data, 'base64'));

    if (version === 'ORIGINAL') {
      // Flip the image horizontally for the 'ORIGINAL' version
      image.flip(true, false);
    }

    // Save the image to the predetermined local location
    await image.writeAsync(savePath);

    console.log(`${version} image saved locally successfully.`);

    // Save the image to S3
    const params = {
      Bucket: 'pictosphere-prod',
      Key: `captures/${version.toLowerCase()}/${imgName}.png`,
      Body: fs.createReadStream(savePath),
      ContentType: 'image/png'
    };

    const data = await s3.upload(params).promise();
    console.log(`${version} image uploaded to S3 successfully. S3 URL: ${data.Location}`);

    return savePath;
  } catch (err) {
    console.error(`Error processing the image: ${err}`);
    throw err;
  }
};

module.exports = exportFile;