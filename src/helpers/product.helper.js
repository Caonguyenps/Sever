const categoryModel = require("../models/category.model");
const productModel = require("../models/product.model");
const branchModel = require("../models/branch.model");
const averageModel = require("../models/average.model");

const getSkip = (page) => {
  let skip = 0;
  if (page == 0) {
    skip = 0;
  } else {
    skip = page * 18;
  }
  return skip;
};
const getHomeProductType = (type) => {
  return new Promise(async (resolve, reject) => {
    await productModel
      .getHomeProductType(type)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const getProductCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    data.skip = getSkip(data.page);
    const countProduct = await productModel.getCountProductCategory(
      data.categoryID
    );
    await productModel
      .getProductCategory(data)
      .then((res) => {
        return resolve({ count: countProduct, listsProduct: res });
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
    // await productModel
    //   .getHomeProductType(type)
    //   .then((res) => {
    //     return resolve(res);
    //   })
    //   .catch((error) => {
    //     return reject({ message: `query failed, ${error}` });
    //   });
  });
};

const getProductFilter = (data) => {
  return new Promise(async (resolve, reject) => {
    data.skip = getSkip(data.page);
    const countProduct = await productModel.getCountProductFilter(data);
    await productModel
      .getProductFilter(data)
      .then((res) => {
        return resolve({ count: countProduct, listsProduct: res });
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const getDeailsProduct = (productID) => {
  return new Promise(async (resolve, reject) => {
    await productModel
      .getDetailsProduct(productID)
      .then(async (res) => {
        const getCategory = await categoryModel.getDetailsSubCategory(
          res.subCategoryID,
          res.categoryID
        );
        const getBranch = await branchModel.getDetailsBranch(res.brandID);
        // const getAvg = averageModel.getAverage(productID);
        let rating = {
          total: 0,
          star: 0,
          avg: 0,
        };
        // if (getAvg)
        if (getCategory && getBranch) {
          return resolve({
            product: res,
            category: getCategory,
            branch: getBranch,
            rating: rating,
          });
        } else {
          return reject({ message: `getCategory or getBranch failed` });
        }
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const getRelatedProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    await productModel
      .getRelatedProduct(data)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const searchProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    await productModel
      .searchProduct(data)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

module.exports = {
  getHomeProductType: getHomeProductType,
  getProductCategory: getProductCategory,
  getProductFilter: getProductFilter,
  getDeailsProduct: getDeailsProduct,
  getRelatedProduct: getRelatedProduct,
  searchProduct: searchProduct
};
