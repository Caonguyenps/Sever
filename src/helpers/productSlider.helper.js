const productSliderModel = require("../models/productSlider.model");
const companyModel = require("../models/company.model");
const categorySlideModel = require("../models/categorySlide.model");
const getProductSlider = (categoryID) => {
  return new Promise(async (resolve, reject) => {
    const arr = [];
    await productSliderModel
      .getProductCategory(categoryID)
      .then(async (res) => {
        for (let item of res) {
          const getCompany = await companyModel.getCompanyById(item.companyID);
          if (getCompany) {
            arr.push({ company: getCompany, product: item });
          }
        }
        return resolve(arr);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const getCategoryProduct = () => {
  return new Promise(async (resolve, reject) => {
    await categorySlideModel
      .getListsCategory()
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

module.exports = {
  getProductSlider: getProductSlider,
  getCategoryProduct: getCategoryProduct,
};
