const errorHelper = require("../helpers/error.helper");
const productHelper = require("../helpers/product.helper");
const getHomeProductType = async (req, res) => {
  try {
    const type = parseInt(req.params.type);
    await productHelper
      .getHomeProductType(type)
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

const getProductCategory = async (req, res) => {
  try {
    const data = {
      categoryID: req.params.categoryID,
      page: parseInt(req.params.page),
    };
    await productHelper
      .getProductCategory(data)
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

const getProductFilter = async (req, res) => {
  try {
    const data = {
      categoryID: req.body.categoryID,
      subCategoryID: req.body.subCategoryID || "",
      branchID: req.body.branchID || "",
      price: req.body.price || "",
      page: parseInt(req.body.page),
    };
    await productHelper
      .getProductFilter(data)
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

const getDeailsProduct = async (req, res) => {
  try {
    const productID = req.params.productID;
    await productHelper
      .getDeailsProduct(productID)
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

const getRelatedProduct = async (req, res) => {
  try {
    const data = {
      categoryID: req.params.categoryID,
      subCategoryID: req.params.subCategoryID,
      branchID: req.params.branchID,
    };
    await productHelper
      .getRelatedProduct(data)
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

const searchProduct = async (req, res) => {
  try {
    const data = {
      categoryID: req.params.categoryID,
      search: req.params.search,
    };
    console.log(data);
    await productHelper
      .searchProduct(data)
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
  getHomeProductType: getHomeProductType,
  getProductCategory: getProductCategory,
  getProductFilter: getProductFilter,
  getDeailsProduct: getDeailsProduct,
  getRelatedProduct: getRelatedProduct,
  searchProduct: searchProduct
};
