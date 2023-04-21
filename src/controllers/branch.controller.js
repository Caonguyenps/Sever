const errorHelper = require("../helpers/error.helper");
const branchHelper = require("../helpers/branch.helper");
const createBranch = async (req, res) => {
  try {
    const data = {
      branchName: req.body.branchName,
    };
    await branchHelper
      .createBranch(data)
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

const updateBranchName = async (req, res) => {
  try {
    const data = {
      branchID: req.params.branchID,
      branchName: req.body.branchName,
    };
    await branchHelper
      .updateBranchName(data)
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

const addCategoryBranch = async (req, res) => {
  try {
    const data = {
      branchID: req.params.branchID,
      categoryID: req.body.categoryID,
    };
    await branchHelper
      .addCategoryBranch(data)
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

const deleteBranch = async (req, res) => {
  try {
    const branchID = req.params.branchID;
    await branchHelper
      .deleteBranch(branchID)
      .then(() => {
        return errorHelper.handleRes(res, 200, "delete branch successfully");
      })
      .catch((error) => {
        return errorHelper.handleError(res, 500, error.message);
      });
  } catch (error) {
    return errorHelper.handleError(res, 500, error.message);
  }
};

const deleteCategoryBranch = async (req, res) => {
  try {
    const data = {
      branchID: req.params.branchID,
      categoryID: req.params.categoryID,
    };
    await branchHelper
      .deleteCategoryBranch(data)
      .then(() => {
        return errorHelper.handleRes(res, 200, "delete category successfully");
      })
      .catch((error) => {
        return errorHelper.handleError(res, 500, error.message);
      });
  } catch (error) {
    return errorHelper.handleError(res, 500, error.message);
  }
};

const getBranchCategory = async (req, res) => {
  try {
    const categoryID = req.params.categoryID;
    await branchHelper
      .getBranchCategory(categoryID)
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

const getAllBranch = async (req, res) => {
  try {
    await branchHelper
      .getAllBranch()
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
  createBranch: createBranch,
  updateBranchName: updateBranchName,
  addCategoryBranch: addCategoryBranch,
  deleteBranch: deleteBranch,
  deleteCategoryBranch: deleteCategoryBranch,
  getBranchCategory: getBranchCategory,
  getAllBranch: getAllBranch,
};
