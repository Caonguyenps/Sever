const errorHelper = require("../helpers/error.helper");
const dailyDiscoverHelper = require("../helpers/dailyDiscover.helper");
const getHomeProductDaily = async (req, res) => {
  try {
    await dailyDiscoverHelper
      .getHomeProductDaily()
      .then((result) => {
        return errorHelper.handleRes(res, 200, result);
      })
      .catch((error) => {
        return errorHelper.handleError(res, 200, error.message);
      });
  } catch (error) {
    return errorHelper.handleError(res, 500, error.message);
  }
};

const getCustomerTalk = async (req, res) => {
  try {
    await dailyDiscoverHelper
      .getCustomerTalk()
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
  getHomeProductDaily: getHomeProductDaily,
  getCustomerTalk: getCustomerTalk,
};
