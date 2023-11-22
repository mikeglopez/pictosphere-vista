require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const getImages = require('./helpers/get_images');
const getCurrentDateTime = require('./helpers/date_formatter');
const exportFile = require('./helpers/image_exporter');
const reminiEnhance = require('./helpers/remini_enhance');

const app = express();
const port = 5000;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());

// Server Logging for Testing
// app.use((req, res, next) => {
//   console.log(`${req.method} request received at ${req.url}`);
//   next();
// });


app.get('/api/images', async (req, res) => {
  const process = req.query.process ? req.query.process : 'original';

  try {
    const imageUrls = await getImages(process);
    res.status(200).send(imageUrls);
  } catch (err) {
    console.error(`Error getting images: ${err}`)
    res.status(500).send(`Error getting images: ${err}`);
  }
})

app.post('/api/process', async (req, res) => {
  const imgPath = req.body.image; // base64 png image string from react-webcam
  const toBeEnhanced = req.body.enhance; // boolean determining whether to process with Remini or not

  // Generate the file name and save path for the captured photo
  const imgName = getCurrentDateTime();
  const originalImagePathBase = `${__dirname}/../public/captures/original`;

  try {
    // Call exportFile to save the original image
    await exportFile(originalImagePathBase, imgPath, imgName, 'ORIGINAL');

    if (toBeEnhanced) {
      // Call reminiEnhance to process the image
      await reminiEnhance(originalImagePathBase, imgName);
    }

    res.status(200).send('Success!!!');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// Flux Capacitor Endpoints

if (process.env.NODE_ENV === 'development') {
  const { startLightFluxing, setFluxSpeed, stopLightFluxing } = require('./helpers/flux_capacitor');

  app.post('/api/flux-capacitor/start', (req, res) => {
    startLightFluxing();
    res.status(200).send('Flux Capacitor Initialized');
  });

  app.post('/api/flux-capacitor/speed', (req, res) => {
    const { speed } = req.body;

    if (speed === 'fast') {
      setFluxSpeed(80);
    } else {
      setFluxSpeed(200); // Default speed
    }

    res.send({ message: 'Flux speed updated successfully.' });
  });

  app.post('/api/flux-capacitor/stop', (req, res) => {
    stopLightFluxing();
    res.status(200).send('Flux Capacitor Stopped');
  });
};

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
