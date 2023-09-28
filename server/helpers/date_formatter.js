const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2); // Get last two digits of the year (23 for 2023)
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Add 1 to month since it's 0-based, and pad with '0' if needed
  const day = now.getDate().toString().padStart(2, '0'); // Pad day with '0' if needed
  const hours = now.getHours().toString().padStart(2, '0'); // Pad hours with '0' if needed
  const minutes = now.getMinutes().toString().padStart(2, '0'); // Pad minutes with '0' if needed
  const seconds = now.getSeconds().toString().padStart(2, '0'); // Pad seconds with '0' if needed

  return `${month}-${day}-${year}_${hours}${minutes}-${seconds}`; // Output: '09-22-23_1702-56'
};

module.exports = getCurrentDateTime;