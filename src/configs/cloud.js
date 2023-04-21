const cloudinary = require("cloudinary").v2;

const cloud = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
    return cloudinary;
  } catch (error) {
    return error;
  }
};

module.exports = cloud;
