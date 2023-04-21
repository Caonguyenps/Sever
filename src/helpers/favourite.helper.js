const userModel = require("../models/user.model");
const favouriteModel = require("../models/favourite.model");
const productModel = require("../models/product.model");
const addFavourite = (data) => {
  return new Promise(async (resolve, reject) => {
    const checkUser = await userModel.findUserByIDNoPassword(data.ownerID);

    if (checkUser) {
      const checkFavourite = await favouriteModel.checkFavourite(data);
      if (!checkFavourite) {
        await favouriteModel(data)
          .save()
          .then((res) => {
            return resolve(res);
          })
          .catch((error) => {
            return reject({ message: `query failed, ${error}` });
          });
      } else {
        return reject({ message: `product alredy favourite by user` });
      }
    } else {
      return reject({ message: "ownerID failed" });
    }
  });
};

const deleteFavourite = (data) => {
  return new Promise(async (resolve, reject) => {
    const checkUser = await userModel.findUserByIDNoPassword(data.ownerID);
    if (checkUser) {
      const checkFavourite = await favouriteModel.checkFavourite(data);
      if (checkFavourite) {
        await favouriteModel
          .deleteFavourite(checkFavourite._id)
          .then((res) => {
            return resolve(res);
          })
          .catch((error) => {
            return reject({ message: `query failed, ${error}` });
          });
      } else {
        return reject({ message: `product not exists favourite by user` });
      }
    } else {
      return reject({ message: "ownerID failed" });
    }
  });
};

const getFavourite = (ownerID) => {
  return new Promise(async (resolve, reject) => {
    await favouriteModel
      .getfavouriteUser(ownerID)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const getDetailsFavourite = (ownerID) => {
  return new Promise(async (resolve, reject) => {
    await favouriteModel
      .getfavouriteUser(ownerID)
      .then(async (res) => {
        const arr = [];
        for (let item of res) {
          const getProduct = await productModel.getDetailsProduct(
            item.productID
          );
          if (getProduct) {
            arr.push(getProduct);
          }
        }
        return resolve(arr);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

module.exports = {
  addFavourite: addFavourite,
  deleteFavourite: deleteFavourite,
  getFavourite: getFavourite,
  getDetailsFavourite: getDetailsFavourite,
};
