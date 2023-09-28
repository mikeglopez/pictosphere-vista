const fs = require('fs');
const axios = require('axios');

const exportFile = (savePath, imgData, version) => {
  return new Promise((resolve, reject) => {
    // For downloading the original captured image
    if (version === 'ORIGINAL') {
      const base64Data = imgData.replace(/^data:image\/png;base64,/, '');

      // Save the processed image to the predetermined location
      fs.writeFile(savePath, base64Data, 'base64', err => {
        if (err) {
          console.error(`Error saving the ${version} image:`, err);
          reject(`Error saving the ${version} image: ${err}`);
        } else {
          console.log(`${version} image saved successfully.`);
          resolve(savePath);
        }
      });
    // For downloading the Remini AI enhanced image
    } else {
      (async () => {
        // Save the processed image to the predetermined location
        try {
          const response = await axios({
            url: imgData,
            responseType: 'stream'
          });

          response.data
            .pipe(fs.createWriteStream(savePath))
            .on('finish', () => {
              console.log(`${version} image saved successfully.`);
              resolve(savePath);
            })
            .on('error', err => {
              console.error(`Error saving the ${version} image:`, err);
              reject(`Error saving the ${version} image: ${err}`);
            });
        } catch (error) {
          console.error(`Caught: Error saving the ${version} image:`, error);
          reject(`Error saving the ${version} image: ${error}`);
        }
      })();
    }
  });
};

module.exports = exportFile;