const errorHelper = require("../helpers/error.helper");
const favouriteHelper = require("../helpers/favourite.helper");
const addFavourite = async (req, res) => {
  try {
    const data = {
      ownerID: req.body.ownerID,
      productID: req.body.productID,
    };
    await favouriteHelper
      .addFavourite(data)
      .then(() => {
        return errorHelper.handleRes(res, 200, "success");
      })
      .catch((error) => {
        return errorHelper.handleError(res, 500, error.message);
      });
  } catch (error) {
    return errorHelper.handleError(res, 500, error.message);
  }
};

const deleteFavourite = async (req, res) => {
  try {
    const data = {
      ownerID: req.body.ownerID,
      productID: req.body.productID,
    };
    await favouriteHelper
      .deleteFavourite(data)
      .then(() => {
        return errorHelper.handleRes(res, 200, "success");
      })
      .catch((error) => {
        return errorHelper.handleError(res, 500, error.message);
      });
  } catch (error) {
    return errorHelper.handleError(res, 500, error.message);
  }
};

const getFavourite = async (req, res) => {
  try {
    const ownerID = req.params.ownerID;
    console.log(ownerID);
    await favouriteHelper
      .getFavourite(ownerID)
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

const getDetailsFavourite = async (req, res) => {
  try {
    const ownerID = req.params.ownerID;
    await favouriteHelper
      .getDetailsFavourite(ownerID)
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
  addFavourite: addFavourite,
  deleteFavourite: deleteFavourite,
  getFavourite: getFavourite,
  getDetailsFavourite: getDetailsFavourite,
};
