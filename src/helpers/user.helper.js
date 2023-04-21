const jwtHelper = require("../helpers/jwt.helper");
const userModel = require("../models/user.model");
const emailServices = require("../services/email.services");
const cloudImageServices = require("../services/cloudImage.services");
const otpModel = require("../models/otp.model");
const deliveryAddressModel = require("../models/deliveryAddress.model");
const randomCode = async () => {
  let code = Math.floor(100000 + Math.random() * 900000);
  return code;
};

const getSkip = (page) => {
  let skip = 0;
  if (page == 0) {
    skip = 0;
  } else {
    skip = page * 10;
  }
  return skip;
};

const register = (data) => {
  return new Promise(async (resolve, reject) => {
    const checkPhoneNumber = await userModel.findUserByPhoneNumber(
      data.phoneNumber
    );
    if (checkPhoneNumber) {
      return reject({
        status: 409,
        message: "Your phone number has been registered to another account!",
      });
    }
    const checkEmail = await userModel.findUserByEmail(data.email);
    if (checkEmail) {
      return reject({
        status: 410,
        message: "Your email has been registered to another account!",
      });
    }
    let code = await randomCode();
    const findOtpUser = await otpModel.findUser(data.email);
    await emailServices
      .sendOtpMail(data.email, code)
      .then(async (res) => {
        const dataOTP = {
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          password: await userModel.hashPassword(data.password),
          address: data.address,
          email: data.email,
          otp: code,
          created: new Date().getTime(),
        };
        if (findOtpUser) {
          await otpModel
            .updateOTP(dataOTP)
            .then((res) => {
              return resolve(res);
            })
            .catch((error) => {
              return reject({ status: 500, message: `query failed, ${error}` });
            });
        } else {
          await otpModel(dataOTP)
            .save()
            .then((res) => {
              return resolve(res);
            })
            .catch((error) => {
              return reject({ status: 500, message: `query failed, ${error}` });
            });
        }
      })
      .catch((error) => {
        return reject({ message: `send otp failed, ${error}` });
      });
  });
};

const forgotPassword = (email) => {
  return new Promise(async (resolve, reject) => {
    const checkUser = await userModel.findUserByEmail(email);
    if (checkUser) {
      const userData = {
        email: email,
      };
      const accessToken = await jwtHelper.generateToken(
        userData,
        process.env.TOKEN_FORGOT_PASSWORD_SECRET,
        process.env.TOKEN_FORGOT_PASSWORD_LIFE
      );
      if (accessToken) {
        await emailServices
          .sendMailForgotPassword(email, accessToken)
          .then((res) => {
            return resolve(res);
          })
          .catch((error) => {
            return reject({
              status: 500,
              message: `send mail failed, ${error}`,
            });
          });
      } else {
        return reject({ status: 500, message: `generate accessToken failed` });
      }
    } else {
      return reject({
        status: 409,
        message: "email is not registered by any account",
      });
    }
  });
};

const verifyOtpRegister = (data) => {
  return new Promise(async (resolve, reject) => {
    const timeVerify = new Date().getTime();
    const findOtpUser = await otpModel.findUser(data.email);
    if (findOtpUser) {
      if (data.otp != findOtpUser.otp) {
        return reject({ status: 403, message: "OTP is incorrect" });
      } else {
        let differenceTime = (timeVerify - findOtpUser.created) / 60000;
        if (differenceTime > 5) {
          return reject({ status: 401, message: "OTP has expired" });
        } else {
          const dataUser = {
            fullName: findOtpUser.fullName,
            phoneNumber: findOtpUser.phoneNumber,
            email: findOtpUser.email,
            password: findOtpUser.password,
            address: findOtpUser.address,
          };
          await userModel(dataUser)
            .save()
            .then(async (res) => {
              await otpModel
                .deleteOtpUser(data.email)
                .then(() => {
                  return resolve(res);
                })
                .catch((error) => {
                  return reject({
                    status: 500,
                    message: `query failed, ${error}`,
                  });
                });
            })
            .catch((error) => {
              return reject({ status: 500, message: `query failed, ${error}` });
            });
        }
      }
    } else {
      return reject({ status: 500, message: `query failed` });
    }
  });
};

const checkAndLogin = (data) => {
  return new Promise(async (resolve, reject) => {
    const checkUsername = await userModel.findUserByEmail(data.email);
    if (!checkUsername) {
      return reject({ status: 403, message: "Email is not correct" });
    }
    const checkPassword = await checkUsername.comparePassword(data.password);
    if (checkPassword) {
      const userData = {
        _id: checkUsername._id,
        fullName: checkUsername.fullName,
        block: checkUsername.block,
        role: checkUsername.role,
        email: checkUsername.email,
        phoneNumber: checkUsername.phoneNumber,
      };
      const accessToken = await jwtHelper.generateToken(
        userData,
        process.env.ACCESS_TOKEN_SECRET,
        process.env.ACCESS_TOKEN_LIFE
      );
      const refreshToken = await jwtHelper.generateToken(
        userData,
        process.env.REFRESH_TOKEN_SECRET,
        process.env.REFRESH_TOKEN_LIFE
      );
      return resolve({
        message: "Logged in successfully",
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      return reject({ status: 403, message: "Incorrect password" });
    }
  });
};

const updatePassword = (data) => {
  return new Promise(async (resolve, reject) => {
    const findUser = await userModel.findUserByID(data.ownerID);
    if (findUser) {
      const comparePassword = await findUser.comparePassword(data.oldPassword);
      if (comparePassword) {
        await userModel
          .updatePassword(
            data.ownerID,
            await userModel.hashPassword(data.newPassword)
          )
          .then((res) => {
            return resolve(res);
          })
          .catch((error) => {
            return reject({ message: `query failed, ${error}` });
          });
      } else {
        return reject({ message: `query failed, old password is not correct` });
      }
    } else {
      return reject({ message: `query failed, user id does not exist` });
    }
  });
};

const updateNewsPassword = (data) => {
  return new Promise(async (resolve, reject) => {
    const findUser = await userModel.findUserByEmail(data.email);
    if (findUser) {
      await userModel
        .updatePasswordByEmail(
          data.email,
          await userModel.hashPassword(data.newPassword)
        )
        .then((res) => {
          return resolve(res);
        })
        .catch((error) => {
          return reject({ message: `query failed, ${error}` });
        });
    } else {
      return reject({ message: `query failed, user id does not exist` });
    }
  });
};

const resendOTP = (email) => {
  return new Promise(async (resolve, reject) => {
    let code = await randomCode();
    await emailServices
      .sendOtpMail(email, code)
      .then(async () => {
        const dataOTP = {
          email: email,
          otp: code,
          created: new Date().getTime(),
        };
        await otpModel
          .updateOTP(dataOTP)
          .then((result) => {
            return resolve(result);
          })
          .catch((error) => {
            return reject({ message: `query failed, ${error}` });
          });
      })
      .catch((error) => {
        return reject({ message: `send otp failed, ${error}` });
      });
  });
};

const getProfileUser = (ownerID) => {
  return new Promise(async (resolve, reject) => {
    await userModel
      .findUserByIDNoPassword(ownerID)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const updateAvatar = (data) => {
  return new Promise(async (resolve, reject) => {
    let img;
    const checkUser = await userModel.findUserByIDNoPassword(data.ownerID);
    if (checkUser) {
      await cloudImageServices
        .uploadImage(data.avatar)
        .then((res) => {
          img = res;
        })
        .catch((error) => {
          return reject({ message: `query failed, ${error}` });
        });

      await userModel
        .updateAvatar(data.ownerID, img)
        .then(() => {
          return resolve(img);
        })
        .catch((error) => {
          return reject({ message: `query failed, ${error}` });
        });
    } else {
      return reject({
        message: `query failed, user id does not exist `,
      });
    }
  });
};

const updateProfile = (data) => {
  return new Promise(async (resolve, reject) => {
    await userModel
      .updateProfile(data)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const createDeliveryAddress = (data) => {
  return new Promise(async (resolve, reject) => {
    const checkUser = await userModel.findUserByIDNoPassword(data.ownerID);
    if (checkUser) {
      await deliveryAddressModel(data)
        .save()
        .then((res) => {
          return resolve(res);
        })
        .catch((error) => {
          return reject({ message: `query failed, ${error}` });
        });
    } else {
      return reject({
        message: `query failed, user id does not exist `,
      });
    }
  });
};

const getListsDeliveryAddressUser = (ownerID) => {
  return new Promise(async (resolve, reject) => {
    await deliveryAddressModel
      .getAddressUser(ownerID)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const getDetailsDeliveryAddress = (addressID) => {
  return new Promise(async (resolve, reject) => {
    await deliveryAddressModel
      .findAddressByID(addressID)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const updateDeliveryAddress = (data) => {
  return new Promise(async (resolve, reject) => {
    await deliveryAddressModel
      .updateDeliveryAddress(data)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const deleteDeliveryAddress = (addressID) => {
  return new Promise(async (resolve, reject) => {
    await deliveryAddressModel
      .deleteDeliveryAddress(addressID)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const getListsUser = (page) => {
  return new Promise(async (resolve, reject) => {
    let limit = 10;
    let skip = getSkip(page);
    const getListsUser = await userModel.getListsUser(limit, skip);
    const getCountUser = await userModel.getCountUser();
    if (getListsUser && getCountUser) {
      return resolve({ listsUser: getListsUser, count: getCountUser });
    } else {
      return reject({ message: `query failed` });
    }
  });
};

module.exports = {
  register: register,
  verifyOtpRegister: verifyOtpRegister,
  forgotPassword: forgotPassword,
  checkAndLogin: checkAndLogin,
  updatePassword: updatePassword,
  updateNewsPassword: updateNewsPassword,
  resendOTP: resendOTP,
  getProfileUser: getProfileUser,
  updateAvatar: updateAvatar,
  updateProfile: updateProfile,
  createDeliveryAddress: createDeliveryAddress,
  getListsDeliveryAddressUser: getListsDeliveryAddressUser,
  getDetailsDeliveryAddress: getDetailsDeliveryAddress,
  updateDeliveryAddress: updateDeliveryAddress,
  deleteDeliveryAddress: deleteDeliveryAddress,
  getListsUser: getListsUser,
};
