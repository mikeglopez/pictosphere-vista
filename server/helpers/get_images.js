const fs = require('fs');

const getImages = basePath => {
  const files = fs.readdirSync(`${__dirname}/../../${basePath}`);
  const imageFiles = files.filter(file => file.includes('.png'));
  const newBasePath = basePath.replace('public', '')

  return imageFiles.map(file => `${newBasePath}/${file}`);
};

module.exports = getImages;
