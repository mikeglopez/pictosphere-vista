require('dotenv').config('../../.env');
const AWS = require('aws-sdk');
const fs = require('fs');
const axios = require('axios');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2'
});

const s3 = new AWS.S3();

const exportFile = (savePathBase, imgData, imgName, version) => {
  return new Promise(async (resolve, reject) => {
    let base64Data;

    if (version === 'ORIGINAL') {
      // For downloading the original captured image
      base64Data = imgData.replace(/^data:image\/png;base64,/, '');
    } else if(version === 'PROCESSED') {
      // Download the image from the Remini URL
      try {
        const response = await axios.get(imgData, { responseType: 'arraybuffer' });
        base64Data = Buffer.from(response.data, 'binary').toString('base64');
      } catch (err) {
        console.error(`Error downloading the processed image: ${err}`);
        reject(`Error downloading the processed image: ${err}`);
        return;
      }
    }

    const savePath = `${savePathBase}/${imgName}.png`;

    // Save the image to the predetermined local location
    fs.writeFile(savePath, base64Data, 'base64', err => {
      if (err) {
        console.error(`Error saving the ${version} image:`, err);
        reject(`Error saving the ${version} image: ${err}`);
      } else {
        console.log(`${version} image saved locally successfully.`);

        // Save the image to S3
        const params = {
          Bucket: 'pictosphere-prod',
          Key: `captures/${version.toLowerCase()}/${imgName}.png`,
          Body: fs.createReadStream(savePath),
          ContentType: 'image/png'
        };

        s3.upload(params, (s3Err, data) => {
          if (s3Err) {
            console.error(`Error uploading ${version} image to S3: ${s3Err}`);
            reject(`Error uploading ${version} image to S3: ${s3Err}`);
          } else {
            console.log(`${version} image uploaded to S3 successfully. S3 URL: ${data.Location}`);
            resolve(savePath);
          }
        });
      }
    });
  });
};

module.exports = exportFile;