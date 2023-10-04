const fs = require('fs');
const imageDateFilter = require('./image_date_filter');

const getImages = basePath => {
  const files = fs.readdirSync(`${__dirname}/../../${basePath}`);
  const imageFiles = files.filter(file => file.includes('.png'));

  const filteredImages = imageFiles.filter(file => imageDateFilter(file))

  const newBasePath = basePath.replace('public', '')

  return filteredImages.map(file => `${newBasePath}/${file}`);
};

module.exports = getImages;
