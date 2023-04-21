const branchModel = require("../models/branch.model");

const createBranch = (data) => {
  return new Promise(async (resolve, reject) => {
    branchModel(data)
      .save()
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const updateBranchName = (data) => {
  return new Promise(async (resolve, reject) => {
    branchModel
      .updateBranchName(data)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const addCategoryBranch = (data) => {
  return new Promise(async (resolve, reject) => {
    const checkCategoryBranch = await branchModel.checkCategoryBranch(data);
    if (checkCategoryBranch) {
      return reject({ message: "branch id has been created" });
    } else {
      branchModel
        .addCategoryBranch(data)
        .then((res) => {
          return resolve(res);
        })
        .catch((error) => {
          return reject({ message: `query failed, ${error}` });
        });
    }
  });
};

const deleteBranch = (branchID) => {
  return new Promise(async (resolve, reject) => {
    await branchModel
      .deleteBranch(branchID)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const deleteCategoryBranch = (data) => {
  return new Promise(async (resolve, reject) => {
    await branchModel
      .deleteCategoryBranch(data)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const getBranchCategory = (categoryID) => {
  return new Promise(async (resolve, reject) => {
    await branchModel
      .getBranchCategory(categoryID)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const getAllBranch = () => {
  return new Promise(async (resolve, reject) => {
    await branchModel
      .getAllBranch()
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
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
