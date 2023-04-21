const jwtHelper = require("../helpers/jwt.helper");

let tokenList = {};

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
//ma secretKey
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

//thoi gian song cua refreshToken
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
//ma refreshTokenSecret
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

let refreshToken = async (req, res) => {
  // User gửi mã refresh token kèm theo trong body
  const refreshTokenFromClient = req.body.refreshToken;
  // if (refreshTokenFromClient && tokenList[refreshTokenFromClient]) {
  try {
    //Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded
    const decoded = await jwtHelper.verifyToken(
      refreshTokenFromClient,
      refreshTokenSecret
    );
    // Thông tin user lúc này các bạn có thể lấy thông qua biến decoded.data
    // có thể mở comment dòng debug bên dưới để xem là rõ nhé.
    const userData = decoded.data;

    //thực hiện tạo mã Token trong bước gọi refresh Token
    const accessToken = await jwtHelper.generateToken(
      userData,
      accessTokenSecret,
      accessTokenLife
    );

    //send new token to client
    return res.status(200).json({ accessToken });
  } catch (error) {
    res.status(403).json({
      message: "Invalid refresh token",
    });
  }
};

module.exports = {
  refreshToken: refreshToken,
  //   login: login,
};
