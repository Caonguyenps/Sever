const bannerHelper = require("../helpers/banner.helper");
const errorHelper = require("../helpers/error.helper");
const getBanner = async (req, res) => {
  try {
    await bannerHelper
      .getBanner()
      .then((result) => {
        return errorHelper.handleRes(res, 200, result);
      })
      .catch((error) => {
        return errorHelper.handleError(res, 500, error.message);
      });
  } catch (error) {
    return errorHelper.handleError(res, 500, error.message);
  }
};

module.exports = {
  getBanner: getBanner,
};
