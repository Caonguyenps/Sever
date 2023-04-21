const categoryModel = require("../models/category.model");

const getListsCategory = (type) => {
  return new Promise(async (resolve, reject) => {
    if (type != "product" && type != "news") {
      return reject({ message: "query failed, type does not exist" });
    } else {
      categoryModel
        .getListsCategory(type)
        .then((res) => {
          return resolve(res);
        })
        .catch((error) => {
          return reject({ message: `query failed, ${error}` });
        });
    }
  });
};

const getDetailsCategory = (categoryID) => {
  return new Promise(async (resolve, reject) => {
    categoryModel
      .getDetailsCategory(categoryID)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const getDetailsSubCategory = (subCategoryID) => {
  return new Promise(async (resolve, reject) => {
    categoryModel
      .getDetailsSubCategory(subCategoryID)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

module.exports = {
  getListsCategory: getListsCategory,
  getDetailsCategory: getDetailsCategory,
  getDetailsSubCategory: getDetailsSubCategory,
};
