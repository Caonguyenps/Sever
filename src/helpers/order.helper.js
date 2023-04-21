const orderProductModel = require("../models/orderProduct.model");
const productSliderModel = require("../models/productSlider.model");
const companyModel = require("../models/company.model");
const firebaseServices = require("../services/firebaseMessage.services");
const emailService = require("../services/email.services");
const adminModel = require("../models/admin.model");

const randomPassword = () => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (var i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const getSkip = (page) => {
  let skip = 0;
  if (page == 0) {
    skip = 0;
  } else {
    skip = page * 16;
  }
  return skip;
};

const OrderProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    await orderProductModel(data)
      .save()
      .then(async () => {
        await firebaseServices
          .sendMessageTopic({
            topic: "62a16dffe77f515fe598094f",
            title: "Got a new order",
            body: "Online showroom has a new order",
          })
          .then((result) => {
            return resolve(result);
          })
          .catch((error) => {
            return reject({ message: `query failed, ${error}` });
          });
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const getListsOrder = () => {
  return new Promise(async (resolve, reject) => {
    await orderProductModel
      .getAllOrder()
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const getDetailsOrder = (orderID) => {
  return new Promise(async (resolve, reject) => {
    await orderProductModel
      .getDetailsOrder(orderID)
      .then(async (res) => {
        let arr = [];
        for (let item of res.listsProduct) {
          const getProduct = await productSliderModel.getDetailsProduct(
            item.productID
          );
          if (getProduct) {
            arr.push(getProduct);
          }
        }
        return resolve({ order: res, listsProduct: arr });
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const getListsCompany = () => {
  return new Promise(async (resolve, reject) => {
    await companyModel
      .getListsCompany()
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const getListOrderType = (type) => {
  return new Promise(async (resolve, reject) => {
    await orderProductModel
      .getListOrderType(type)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const removeProductOrder = (data) => {
  return new Promise(async (resolve, reject) => {
    await orderProductModel
      .removeProductOrder(data)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const confirmOrder = (data) => {
  return new Promise(async (resolve, reject) => {
    await orderProductModel
      .confirmOrder(data)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const deleteOrder = (orderID) => {
  return new Promise(async (resolve, reject) => {
    await orderProductModel
      .deleteOrder(orderID)
      .then((res) => {
        return resolve(res);
        await;
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const createCompany = (data) => {
  return new Promise(async (resolve, reject) => {
    const checkCompany = await companyModel.checkCompany(data);
    if (!checkCompany) {
      const password = randomPassword();
      await emailService
        .sendAccountMail(data, password)
        .then(async (res) => {
          data.password = await companyModel.hashPassword(password);
          await companyModel(data)
            .save()
            .then((res) => {
              return resolve(res);
            })
            .catch((error) => {
              return reject({
                status: 500,
                message: "Có lỗi xảy ra, vui lòng thử lại sau",
              });
            });
        })
        .catch((error) => {
          return reject({
            status: 500,
            message: "Có lỗi xảy ra, vui lòng thử lại sau",
          });
        });
    } else {
      let msg = "";
      if (checkCompany.email == data.email) {
        msg =
          "Email công ty đã được đăng kí trước đó, vui lòng nhập email khác.";
      } else if (checkCompany.acronym == data.acronym) {
        msg =
          "Tên viết tắt đã được đăng kí trước đó, vui lòng nhập tên viết tắt khác";
      }
      return reject({ status: 409, message: msg });
    }
  });
};

const getDetailsCompany = (companyID) => {
  return new Promise(async (resolve, reject) => {
    await companyModel
      .getCompanyById(companyID)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const updateCompany = (data, companyID) => {
  return new Promise(async (resolve, reject) => {
    const checkAcronym = await companyModel.checkAcronym(data.acronym);
    if (!checkAcronym) {
      await companyModel
        .updateCompany(data, companyID)
        .then((res) => {
          return resolve(res);
        })
        .catch((error) => {
          return reject({ status: 500, message: error });
        });
    } else {
      return reject({
        status: 409,
        message:
          "Tên viết tắt đã được đăng kí trước đó, vui lòng nhập tên viết tắt khác",
      });
    }
  });
};

const getProductCompany = (data) => {
  return new Promise(async (resolve, reject) => {
    const skip = getSkip(data.page);
    data.skip = skip;
    const count = await productSliderModel.getCountProduct(data.companyID);
    const getProduct = await productSliderModel.getProductPagi(data);
    if (getProduct) {
      const arr = [];
      for (let item of getProduct) {
        const getCompany = await companyModel.getCompanyById(item.companyID);
        if (getCompany) {
          arr.push({ company: getCompany, product: item });
        }
      }
      return resolve({ count: count, listsProduct: arr });
    }
  });
};

const searchProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    await productSliderModel
      .searchProduct(data)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const updatePassword = (data) => {
  return new Promise(async (resolve, reject) => {
    const findUser = await adminModel.findUserByID("62a16dffe77f515fe598094f");
    if (findUser) {
      const comparePassword = await findUser.comparePassword(data.oldPassword);
      if (comparePassword) {
        await adminModel
          .updatePassword(
            findUser._id,
            await adminModel.hashPassword(data.newPassword)
          )
          .then((res) => {
            return resolve(res);
          })
          .catch((error) => {
            return reject({ status: 500, message: error });
          });
      } else {
        return reject({
          status: 403,
          message: "Mật khẩu củ không chính xác, vui lòng thử lại",
        });
      }
    } else {
      return reject({ status: 500, message: "find user by id failed" });
    }
  });
};

const updateQuantityOrder = (data) => {
  return new Promise(async (resolve, reject) => {
    console.log(data);
    await orderProductModel
      .updateQuantityOrder(data)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        console.log(error);
        return reject({ message: `query failed, ${error}` });
      });
  });
};

module.exports = {
  OrderProduct: OrderProduct,
  getListsOrder: getListsOrder,
  getDetailsOrder: getDetailsOrder,
  getListsCompany: getListsCompany,
  getListOrderType: getListOrderType,
  removeProductOrder: removeProductOrder,
  confirmOrder: confirmOrder,
  deleteOrder: deleteOrder,
  createCompany: createCompany,
  getDetailsCompany: getDetailsCompany,
  updateCompany: updateCompany,
  getProductCompany: getProductCompany,
  searchProduct: searchProduct,
  updatePassword: updatePassword,
  updateQuantityOrder: updateQuantityOrder,
};
