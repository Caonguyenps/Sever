const jwtHelper = require("../helpers/jwt.helper");
const debug = console.log.bind(console);

// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenForgotPasswordSecret =
  process.env.TOKEN_FORGOT_PASSWORD_SECRET;

let isAuth = async (req, res, next) => {
  const tokenFromClient =
    req.body.token || req.query.token || req.header("authorization");
  console.log(tokenFromClient);
  if (tokenFromClient) {
    try {
      const decoded = await jwtHelper.verifyToken(
        tokenFromClient,
        accessTokenSecret
      );
      req.jwtDecoded = decoded;
      if (decoded.data.role == "user") {
        next();
      } else {
        return res.status(401).json({
          message: "Unauthorized.",
        });
      }
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }
  } else {
    return res.status(403).send({
      message: "No token provided.",
    });
  }
};

let isAuthAdmin = async (req, res, next) => {
  const tokenFromClient =
    req.body.token || req.query.token || req.header("authorization");

  if (tokenFromClient) {
    try {
      const decoded = await jwtHelper.verifyToken(
        tokenFromClient,
        accessTokenSecret
      );
      req.jwtDecoded = decoded;
      if (decoded.data.role == "admin") {
        next();
      } else {
        return res.status(401).json({
          message: "Unauthorized.",
        });
      }
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }
  } else {
    return res.status(403).send({
      message: "No token provided.",
    });
  }
};

let isAuthForgotPassword = async (req, res, next) => {
  const tokenFromClient =
    req.body.token || req.query.token || req.header("authorization");

  if (tokenFromClient) {
    try {
      const decoded = await jwtHelper.verifyToken(
        tokenFromClient,
        accessTokenForgotPasswordSecret
      );
      req.email = decoded.data.email;
      if (decoded) {
        next();
      } else {
        return res.status(401).json({
          message: "Unauthorized.",
        });
      }
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }
  } else {
    return res.status(403).send({
      message: "No token provided.",
    });
  }
};

module.exports = {
  isAuth: isAuth,
  isAuthAdmin: isAuthAdmin,
  isAuthForgotPassword: isAuthForgotPassword,
  // isAuthShip: isAuthShip,
};
