const errorHelper = require("../helpers/error.helper");
const categoryHelper = require("../helpers/category.helper");

const getListsCategory = async (req, res) => {
  try {
    const type = req.params.type;
    await categoryHelper
      .getListsCategory(type)
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

const getDetailsCategory = async (req, res) => {
  try {
    const categoryID = req.params.categoryID;
    await categoryHelper
      .getDetailsCategory(categoryID)
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

const getDetailsSubCategory = async (req, res) => {
  try {
    const subCategoryID = req.params.subCategoryID;
    await categoryHelper
      .getDetailsSubCategory(subCategoryID)
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
  getListsCategory: getListsCategory,
  getDetailsCategory: getDetailsCategory,
  getDetailsSubCategory: getDetailsSubCategory,
};
