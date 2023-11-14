const fs = require('fs').promises;
const axios = require('axios');
const crypto = require('crypto');

const getCurrentDateTime = require('./date_formatter');
const exportFile = require('./image_exporter');

const reminiAPI = process.env.REMINI_API;

const contentType = 'image/png';
const outputContentType = 'image/png';
const timeout = 60000;
const baseUrl = 'https://developer.remini.ai/api';

const processedImagePathBase = `${__dirname}/../../public/captures/processed`;
let processedImageName;

const getImageMd5Content = async imgPath => {
  const content = await fs.readFile(imgPath);
  const md5Hash = crypto.createHash('md5').update(content).digest('base64');
  return { md5Hash, content };
};

const reminiEnhance = async imgPath => {
  const { md5Hash, content } = await getImageMd5Content(imgPath);
  const client = axios.create({
    baseURL: baseUrl,
    headers: { Authorization: `Bearer ${reminiAPI}` },
    timeout: timeout
  });

  console.log('Submitting image ...');
  try {
    const submitTaskResponse = await client.post('/tasks', {
      tools: [
        { type: 'face_enhance', mode: 'base' },
        { type: 'background_enhance', mode: 'professional' },
        { type: 'color_enhance', mode: 'new-york' }
      ],
      image_md5: md5Hash,
      image_content_type: contentType,
      output_content_type: outputContentType
    });

    const taskID = submitTaskResponse.data.task_id;
    const uploadURL = submitTaskResponse.data.upload_url;
    const uploadHeaders = submitTaskResponse.data.upload_headers;

    console.log('Uploading image to Google Cloud Storage ...');
    await axios.put(uploadURL, content, { headers: uploadHeaders });

    console.log(`Processing task: ${taskID} ...`);
    await client.post(`/tasks/${taskID}/process`);

    console.log(`Polling result for task: ${taskID} ...`);
    for (let i = 0; i < 50; i++) {
      const getTaskResponse = await client.get(`/tasks/${taskID}`);

      if (getTaskResponse.data.status === 'completed') {
        const processedImgSrc = getTaskResponse.data.result.output_url;
        console.log('Processing completed.');
        console.log('Output url: ' + processedImgSrc);

        processedImageName = getCurrentDateTime();
        const processedImagePath = `${processedImagePathBase}/${processedImageName}.png`;

        await exportFile(processedImagePath, processedImgSrc, 'PROCESSED');
        return;
      } else {
        if (getTaskResponse.data.status !== 'processing') {
          console.error('Found illegal status: ' + getTaskResponse.data.status);
          return;
        }
        console.log('Processing, sleeping 2 seconds ...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    console.error('Timeout reached! :( ');
  } catch (error) {
    console.log('error.response.data:', error.response.data);
    throw error;
  }
};

module.exports = reminiEnhance;
