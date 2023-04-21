const cloud = require("../configs/cloud");

const uploadImage = (image) => {
  return new Promise(async (resolve, reject) => {
    console.log(image);
    let filePath = image.tempFilePath;
    await cloud()
      .uploader.upload(filePath, (err, result) => {
        if (err) {
          console.log(err);
          return reject({
            message:
              "There was an error uploading the image, please try again later",
          });
        }
      })
      .then((res) => {
        return resolve({ publicID: res.public_id, url: res.url });
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

module.exports = {
  uploadImage: uploadImage,
};
