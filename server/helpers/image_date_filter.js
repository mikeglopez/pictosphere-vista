const imageDateFilter = (fileName) => {
  // Check if fileName is null or undefined
  if (!fileName) {
    console.error("fileName is null or undefined");
    return false;
  }

  // Extract date and time components from the file name while ignoring the ".png" extension
  const match = fileName.match(/^(\d{2})-(\d{2})-(\d{2})_(\d{2})(\d{2})-(\d{2})\.png$/);

  if (!match) {
    console.error("Regex didn't match:", fileName);
    return false;
  }

  // Extracted date and time components
  const [, month, day, year, hours, minutes, seconds] = match;

  // Convert extracted components to a Date object
  const captureDate = new Date(`20${year}`, month - 1, day, hours, minutes, seconds);

  // Determine time difference between current time and captured time
  const now = new Date();
  const timeDifference = now - captureDate; // in ms

  // Check if the image was captured within 48 hours in ms
  return timeDifference <= 48 * 60 * 60 * 1000;
};

module.exports = imageDateFilter;
