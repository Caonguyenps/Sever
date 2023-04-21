const errorHelper = require("../helpers/error.helper");
const jwtHelper = require("../helpers/jwt.helper");
const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    await jwtHelper
      .verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET)
      .then(async (result) => {
        console.log(result);
        const data = {
          _id: result.data._id,
          fullName: result.data.fullName,
          block: result.data.block,
          role: result.data.role,
          phoneNumber: result.data.phoneNumber,
        };
        await jwtHelper
          .generateToken(
            data,
            process.env.ACCESS_TOKEN_SECRET,
            process.env.ACCESS_TOKEN_LIFE
          )
          .then((access) => {
            return errorHelper.handleRes(res, 200, { accessToken: access });
          })
          .catch((error) => {
            return errorHelper.handleError(res, 500, error);
          });
      })
      .catch((error) => {
        return errorHelper.handleError(res, 401, error);
      });
  } catch (error) {
    return errorHelper.handleError(res, 500, error);
  }
};

module.exports = {
  refreshToken: refreshToken,
};
