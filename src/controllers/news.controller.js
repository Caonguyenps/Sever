const errorHelper = require("../helpers/error.helper");
const newsHelper = require("../helpers/news.helper");
const getListsNews = async (req, res) => {
  try {
    const data = {
      categoryID: req.params.categoryID,
      page: parseInt(req.params.page),
    };
    await newsHelper
      .getListsNews(data)
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

const getDetailsNews = async (req, res) => {
  try {
    const newsID = req.params.newsID;
    await newsHelper
      .getDetailsNews(newsID)
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

const createNews = async (req, res) => {
  try {
    const params = req.params.categoryID;
  } catch (error) {
    return errorHelper.handleError(res, 500, error.message);
  }
};

module.exports = {
  getListsNews: getListsNews,
  getDetailsNews: getDetailsNews,
  createNews: createNews,
};
