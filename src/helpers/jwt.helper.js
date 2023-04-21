const jwt = require("jsonwebtoken");
//generateToken – tạo token và verifyToken – xác minh token có hợp lệ hay không.
//create toke
let generateToken = (user, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {
    //dinh nghia thong tin user save to token

    //thực hiện ký và tạo token
    jwt.sign(
      { data: user },
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife, // chu y phan nay
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        resolve(token);
      }
    );
  });
};

//this module used for verify jwt token
//param token
//param secretkey

let verifyToken = (token, secretkey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretkey, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      return resolve(decoded);
    });
  });
};

module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken,
};
