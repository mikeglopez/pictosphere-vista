const express = require('express');
const bodyParser = require('body-parser');

const getImages = require('./helpers/get_images');
const getCurrentDateTime = require('./helpers/date_formatter');
const exportFile = require('./helpers/image_exporter');
const reminiEnhance = require('./helpers/remini_enhance');

const app = express();
const port = 5000;

app.use(bodyParser.json({ limit: '10mb' }));

app.get('/api/images', (req, res) => {
  const imageDirectory = 'public/captures/original';
  const imageUrls = [];

  imageUrls.push(...getImages(imageDirectory))

  res.status(200).send(imageUrls);
})

app.post('/api/process', async (req, res) => {
  const imgPath = req.body.image; // base64 png image string from react-webcam
  const toBeEnhanced = req.body.enhance; // boolean determining whether to process with Remini or not

  // Generate the file name and save path for the captured photo
  const originalImagePathBase = `${__dirname}/../public/captures/original`;
  const originalImageName = getCurrentDateTime();
  const originalImagePath = `${originalImagePathBase}/${originalImageName}.png`;

  // Download the captured photo
  exportFile(originalImagePath, imgPath, 'ORIGINAL')
  // Enhance the captured photo with Remini AI
    .then(imagePath => {
      if (toBeEnhanced) { // Only send to Remini for AI enhancing if true
        return reminiEnhance(originalImagePath);
      }
    })
    .then(() => {
      res.status(200).send('Success!!!');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('An error occurred');
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
