const errorHelper = require("../helpers/error.helper");
const productSliderHelper = require("../helpers/productSlider.helper");
const getProductSlider = async (req, res) => {
  try {
    const categoryID = req.params.categoryID;
    await productSliderHelper
      .getProductSlider(categoryID)
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

const getCategoryProduct = async (req, res) => {
  try {
    await productSliderHelper
      .getCategoryProduct()
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

module.exports = {
  getProductSlider: getProductSlider,
  getCategoryProduct: getCategoryProduct,
};
