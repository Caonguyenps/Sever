const categoryModel = require("../models/category.model");
const newsModel = require("../models/news.model");

const getSkip = (page) => {
  let skip = 0;
  if (page == 0) {
    skip = 0;
  } else {
    skip = page * 10;
  }
  return skip;
};

const getListsNews = (data) => {
  return new Promise(async (resolve, reject) => {
    let skip = getSkip(data.page);
    let limit = 10;
    data.skip = skip;
    data.limit = limit;
    const countNews = await newsModel.getCountNewsCategory(data.categoryID);
    await newsModel
      .getListsNews(data)
      .then((res) => {
        return resolve({ listsNews: res, count: countNews });
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const getDetailsNews = (newsID) => {
  return new Promise(async (resolve, reject) => {
    await newsModel
      .getDetailsNews(newsID)
      .then(async (res) => {
        await categoryModel
          .getDetailsCategory(res.categoryID)
          .then((category) => {
            return resolve({ details: res, category: category });
          })
          .catch((error) => {
            return reject({ message: `query failed, ${error}` });
          });
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};
module.exports = {
  getListsNews: getListsNews,
  getDetailsNews: getDetailsNews,
};
