const adminHelper = require("../helpers/admin.helper");
const errorHelper = require("../helpers/error.helper");
const productModel = require("../models/product.model");
const login = async (req, res) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password,
      token: req.body.token,
    };
    console.log(data);
    await adminHelper
      .checkAndLogin(data)
      .then((data) => {
        return res.status(200).json({
          message: data.message,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
      })
      .catch((error) => {
        return errorHelper.handleError(res, error.status, error.message);
      });
  } catch (error) {
    return errorHelper.handleError(res, error.status, error.message);
  }
};

const createCategory = async (req, res) => {
  try {
    const data = {
      categoryName: req.body.categoryName,
      type: req.body.type,
    };
    await adminHelper
      .createCategory(data)
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

const addSubCategory = async (req, res) => {
  try {
    const data = {
      categoryID: req.params.categoryID,
      subCategoryName: req.body.subCategoryName,
    };
    console.log("data", data);
    await adminHelper
      .addSubCategory(data)
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

const updateCategory = async (req, res) => {
  try {
    const data = {
      categoryID: req.params.categoryID,
      categoryName: req.body.categoryName,
    };
    await adminHelper
      .updateCategory(data)
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

const updateSubCategory = async (req, res) => {
  try {
    const data = {
      subCategoryID: req.params.subCategoryID,
      subCategoryName: req.body.subCategoryName,
    };
    await adminHelper
      .updateSubCategory(data)
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

const deleteCategory = async (req, res) => {
  try {
    const categoryID = req.params.categoryID;
    await adminHelper
      .deleteCategory(categoryID)
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

const deleteSubCategory = async (req, res) => {
  try {
    const data = {
      categoryID: req.params.categoryID,
      subCategoryID: req.params.subCategoryID,
    };
    await adminHelper
      .deleteSubCategory(data)
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

const getListsProduct = async (req, res) => {
  try {
    await productModel
      .getAllProduct()
      .then((result) => {
        return errorHelper.handleRes(res, 200, result);
      })
      .catch((error) => {
        return errorHelper.handleError(res, 500, error);
      });
  } catch (error) {
    return errorHelper.handleError(res, 500, error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productID = req.params.id;
    await productModel
      .deleteProduct(productID)
      .then((result) => {
        return errorHelper.handleRes(res, 200, result);
      })
      .catch((error) => {
        return errorHelper.handleError(res, 500, error);
      });
  } catch (error) {
    return errorHelper.handleError(res, 500, error.message);
  }
};

const statics = async (req, res) => {
  try {
    await adminHelper
      .statics()
      .then((result) => {
        return res.status(200).json({
          result: true,
          data: result,
        });
      })
      .catch((error) => {
        return res.status(500).json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: `add introduce failed, ${error}` });
  }
};

const addProduct = async (req, res) => {
  try {
    let image;
    if (Array.isArray(req.files.image)) {
      image = req.files.image;
    } else {
      image = [req.files.image];
    }
    const data = {
      name: req.body.name,
      price: parseInt(req.body.price),
      categoryID: req.body.categoryID,
      subCategoryID: req.body.subCategoryID,
      brandID: req.body.branchID,
      code: req.body.code,
      image: image,
      description: req.body.description,
      introduce: req.body.introduce,
    };
    console.log(data);

    await adminHelper
      .addProduct(data)
      .then((result) => {
        return res.status(200).json({
          result: true,
        });
      })
      .catch((error) => {
        return res.status(500).json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: `add introduce failed, ${error}` });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productID = req.params.productID;
    const listsImageProduct = [];
    if (req.files) {
      if (req.files["image"]) {
        if (Array.isArray(req.files["image"])) {
          for (let item of req.files["image"]) {
            listsImageProduct.push(item);
          }
        } else {
          listsImageProduct.push(req.files["image"]);
        }
      }
    }
    if (req.body.image) {
      let data = req.body.image;
      if (Array.isArray(data)) {
        if (data.length > 1) {
          for (let item of data) {
            listsImageProduct.push(JSON.parse(item));
          }
        } else {
          listsImageProduct.push(JSON.parse(data[0]));
        }
      } else {
        listsImageProduct.push(JSON.parse(data));
      }
    }

    const data = {
      name: req.body.name,
      price: parseInt(req.body.price),
      categoryID: req.body.categoryID,
      subCategoryID: req.body.subCategoryID,
      brandID: req.body.branchID,
      code: req.body.code,
      image: listsImageProduct,
      description: req.body.description,
      introduce: req.body.introduce,
    };

    await adminHelper
      .updateProduct(data, productID)
      .then((result) => {
        return res.status(200).json({
          result: true,
        });
      })
      .catch((error) => {
        return res.status(500).json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: `add introduce failed, ${error}` });
  }
};

const getListOrder = async (req, res) => {
  try {
    await adminHelper
      .getListOrder()
      .then((result) => {
        return res.status(200).json({
          result: true,
          data: result,
        });
      })
      .catch((error) => {
        return res.status(500).json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: `add introduce failed, ${error}` });
  }
};

module.exports = {
  login: login,
  createCategory: createCategory,
  addSubCategory: addSubCategory,
  updateCategory: updateCategory,
  updateSubCategory: updateSubCategory,
  deleteCategory: deleteCategory,
  deleteSubCategory: deleteSubCategory,
  getListsProduct: getListsProduct,
  deleteProduct: deleteProduct,
  addProduct: addProduct,
  updateProduct: updateProduct,
  statics: statics,
  getListOrder: getListOrder,
};
