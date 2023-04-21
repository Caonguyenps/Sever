const dailyDiscoverModel = require("../models/dailyDiscover.model");
const productModel = require("../models/product.model");
const customerModel = require("../models/customer.model");
const getHomeProductDaily = () => {
  return new Promise(async (resolve, reject) => {
    const arr = [];
    await dailyDiscoverModel.getHomeDaily().then(async (res) => {
      for (let item of res) {
        const getProduct = await productModel.getDetailsProduct(item.productID);
        if (getProduct) {
          arr.push(getProduct);
        }
      }
      return resolve(arr);
    });
  });
};

const getCustomerTalk = () => {
  return new Promise(async (resolve, reject) => {
    await customerModel
      .getCustomerTalk()
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

module.exports = {
  getHomeProductDaily: getHomeProductDaily,
  getCustomerTalk: getCustomerTalk,
};
