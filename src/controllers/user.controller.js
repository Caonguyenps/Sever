const userHelper = require("../helpers/user.helper");
const errorHelper = require("../helpers/error.helper");
const fs = require("fs");

const register = async (req, res) => {
  try {
    const data = {
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
    };

    await userHelper
      .register(data)
      .then(() => {
        return errorHelper.handleRes(res, 200, "register successfully");
      })
      .catch((error) => {
        return errorHelper.handleError(res, error.status, error.message);
      });
  } catch (error) {
    return errorHelper.handleError(res, 500, error);
  }
};

const verifyOtpRegister = async (req, res) => {
  try {
    const data = {
      email: req.body.email,
      otp: req.body.otp,
    };
    await userHelper
      .verifyOtpRegister(data)
      .then(() => {
        return errorHelper.handleRes(res, 200, "register successfully");
      })
      .catch((error) => {
        return errorHelper.handleError(res, error.status, error.message);
      });
  } catch (error) {
    return errorHelper.handleError(res, 500, error);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    await userHelper
      .forgotPassword(email)
      .then(() => {
        return errorHelper.handleRes(res, 200, "success");
      })
      .catch((error) => {
        return errorHelper.handleError(res, error.status, error.message);
      });
  } catch (error) {
    return errorHelper.handleError(res, 500, error);
  }
};

const login = async (req, res) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password,
    };
    await userHelper
      .checkAndLogin(data)
      .then((data) => {
        return res.status(200).json({
          message: data.message,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
      })
      .catch((error) => {
        return errorHelper.handleError(res, error.status, error.message);
      });
  } catch (error) {
    return errorHelper.handleError(res, error.status, error.message);
  }
};

const updatePassword = async (req, res) => {
  try {
    const data = {
      ownerID: req.params.ownerID,
      oldPassword: req.body.oldPassword,
      newPassword: req.body.newPassword,
    };
    await userHelper
      .updatePassword(data)
      .then(() => {
        return errorHelper.handleRes(res, 200, "update password successfully");
      })
      .catch((error) => {
        return errorHelper.handleError(res, 500, error.message);
      });
  } catch (error) {
    return errorHelper.handleError(res, 500, error.message);
  }
};

const updateNewsPassword = async (req, res) => {
  try {
    const data = {
      email: req.email,
      newPassword: req.body.newPassword,
    };
    await userHelper
      .updateNewsPassword(data)
      .then(() => {
        return errorHelper.handleRes(res, 200, "update password successfully");
      })
      .catch((error) => {
        return errorHelper.handleError(res, 500, error.message);
      });
  } catch (error) {
    return errorHelper.handleError(res, 500, error.message);
  }
};

const resendOTP = async (req, res) => {
  try {
    const email = req.body.email;
    await userHelper
      .resendOTP(email)
      .then(() => {
        return errorHelper.handleRes(res, 200, "resend otp success");
      })
      .catch((error) => {
        return errorHelper.handleError(res, 500, error.message);
      });
  } catch (error) {
    return errorHelper.handleError(res, 500, error.message);
  }
};

const getProfileUser = async (req, res) => {
  try {
    const ownerID = req.params.ownerID;
    await userHelper
      .getProfileUser(ownerID)
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

const updateAvatar = async (req, res) => {
  try {
    const data = {
      ownerID: req.params.ownerID,
      avatar: req.files.avatar,
    };
    await userHelper
      .updateAvatar(data)
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

const updateProfile = async (req, res) => {
  try {
    const data = {
      ownerID: req.params.ownerID,
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
    };

    await userHelper
      .updateProfile(data)
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

const createDeliveryAddress = async (req, res) => {
  try {
    const data = {
      ownerID: req.body.ownerID,
      province: req.body.province,
      district: req.body.district,
      wards: req.body.wards,
      address: req.body.address,
    };
    await userHelper
      .createDeliveryAddress(data)
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

const getListsDeliveryAddressUser = async (req, res) => {
  try {
    const ownerID = req.params.ownerID;
    await userHelper
      .getListsDeliveryAddressUser(ownerID)
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

const getDetailsDeliveryAddress = async (req, res) => {
  try {
    const addressID = req.params.addressID;
    await userHelper
      .getDetailsDeliveryAddress(addressID)
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

const updateDeliveryAddress = async (req, res) => {
  try {
    const data = {
      addressID: req.params.addressID,
      province: req.body.province,
      district: req.body.district,
      wards: req.body.wards || "",
      address: req.body.address,
    };
    await userHelper
      .updateDeliveryAddress(data)
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

const deleteDeliveryAddress = async (req, res) => {
  try {
    const addressID = req.params.addressID;
    await userHelper
      .deleteDeliveryAddress(addressID)
      .then(() => {
        return errorHelper.handleRes(res, 200, "delete delivery successfully");
      })
      .catch((error) => {
        return errorHelper.handleError(res, 500, error.message);
      });
  } catch (error) {
    return errorHelper.handleError(res, 500, error.message);
  }
};

const getListsUser = async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    await userHelper
      .getListsUser(page)
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
  register: register,
  verifyOtpRegister: verifyOtpRegister,
  login: login,
  forgotPassword: forgotPassword,
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
