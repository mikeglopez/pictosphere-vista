const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const getImages = require('./helpers/get_images');
const getCurrentDateTime = require('./helpers/date_formatter');
const exportFile = require('./helpers/image_exporter');
const reminiEnhance = require('./helpers/remini_enhance');
const { startLightFluxing, setFluxSpeed, stopLightFluxing } = require('./helpers/flux_capacitor');

const app = express();
const port = 5000;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());

const _dirname = path.dirname('');
const buildPath = path.join(_dirname, '../build');

app.use(express.static(buildPath));

app.get('/*', (req, res) => {
  res.sendFile(
    path.join(_dirname, '../build/index.html'),
    (err) => {
      if (err) {
        res.status(500).send(err);
      }
    }
  )
})

// Server Logging for Testing
// app.use((req, res, next) => {
//   console.log(`${req.method} request received at ${req.url}`);
//   next();
// });


app.get('/api/images', (req, res) => {
  const process = req.query.process ? req.query.process : 'original';
  const imageDirectory = `public/captures/${process}`;
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

// Flux Capacitor Endpoints

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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
