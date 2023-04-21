const bannerModel = require("../models/banner.model");

const getBanner = () => {
  return new Promise(async (resolve, reject) => {
    await bannerModel
      .getBanner()
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};
module.exports = {
  getBanner: getBanner,
};
