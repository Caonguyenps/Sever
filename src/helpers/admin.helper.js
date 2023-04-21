const adminModel = require("../models/admin.model");
const jwtHelper = require("../helpers/jwt.helper");
const categoryModel = require("../models/category.model");
const firebaseServices = require("../services/firebaseMessage.services");
const cloudinary = require("../configs/cloud.js");
const productModel = require("../models/product.model");
const orderModel = require("../models/order.model");
const userModel = require("../models/user.model");
const checkAndLogin = (data) => {
  return new Promise(async (resolve, reject) => {
    const checkUsername = await adminModel.findUserByEmail(data.email);
    if (!checkUsername) {
      return reject({ status: 403, message: "email không đúng" });
    }
    const checkPassword = await checkUsername.comparePassword(data.password);
    if (checkPassword) {
      const userData = {
        _id: checkUsername._id,
        fullName: checkUsername.fullName,
        role: checkUsername.role,
        email: checkUsername.email,
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
      await firebaseServices
        .subscribeToTopic(accessToken, checkUsername._id)
        .then((res) => {
          console.log(res);
          return resolve({
            message: "Logged in successfully",
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
        })
        .catch((error) => {
          console.log(error);
          return resolve({
            message: "Logged in successfully",
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
        });
    } else {
      return reject({ status: 403, message: "Mật khẩu không đúng" });
    }
  });
};

const createCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    await categoryModel(data)
      .save()
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};
const addSubCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    await categoryModel
      .addSubCategory(data)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        console.log(error);
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const updateCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    await categoryModel
      .updateCategory(data)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const updateSubCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    await categoryModel
      .updateSubCategory(data)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const deleteCategory = (categoryID) => {
  return new Promise(async (resolve, reject) => {
    await categoryModel
      .deleteCategory(categoryID)
      .then((res) => {
        return resolve("delete category successfully");
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const deleteSubCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    await categoryModel
      .deleteSubCategory(data)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const addProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    const img = [];
    for (let item of data.image) {
      let filePath = item.tempFilePath;
      await cloudinary()
        .uploader.upload(filePath, (err, result) => {
          if (err) {
            return reject({
              message:
                "There was an error uploading the image, please try again later",
            });
          }
        })
        .then(async (result) => {
          imgData = {
            publicID: result.public_id,
            url: result.url,
          };
          img.push(imgData);
        })
        .catch((error) => {
          console.log("error ", error);
        });
    }

    let newData = {
      productName: data.name,
      price: data.price,
      code: data.code,
      categoryID: data.categoryID,
      subCategoryID: data.subCategoryID,
      brandID: data.brandID,
      description: data.description,
      introduce: data.introduce,
      image: img,
    };
    await productModel(newData)
      .save()
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        conso;
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const statics = (data) => {
  return new Promise(async (resolve, reject) => {
    const category = await categoryModel.getListsCategory("product");
    const product = await productModel.getAllProduct();
    const order = await orderModel.getAllOrder();
    const user = await userModel.getListsUser();
    return resolve({
      category: category || [],
      product: product || [],
      order: order || [],
      user: user || [],
    });
  });
};

const updateProduct = (data, id) => {
  return new Promise(async (resolve, reject) => {
    const img = [];
    for (let item of data.image) {
      let filePath = item.tempFilePath;
      if (filePath) {
        await cloudinary()
          .uploader.upload(filePath, (err, result) => {
            if (err) {
              return reject({
                message:
                  "There was an error uploading the image, please try again later",
              });
            }
          })
          .then(async (result) => {
            imgData = {
              publicID: result.public_id,
              url: result.url,
            };
            img.push(imgData);
          })
          .catch((error) => {
            console.log("error ", error);
          });
      } else {
        img.push(item);
      }
    }

    let newData = {
      productName: data.name,
      price: data.price,
      code: data.code,
      categoryID: data.categoryID,
      subCategoryID: data.subCategoryID,
      branchID: data.brandID,
      description: data.description,
      introduce: data.introduce,
      image: img,
    };
    console.log(data);
    await productModel
      .updateProduct(newData, id)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const getListOrder = (data) => {
  return new Promise(async (resolve, reject) => {
    const order = await orderModel.getAllOrder();
    return resolve(order);
  });
};

module.exports = {
  checkAndLogin: checkAndLogin,
  createCategory: createCategory,
  addSubCategory: addSubCategory,
  updateCategory: updateCategory,
  updateSubCategory: updateSubCategory,
  deleteCategory: deleteCategory,
  deleteSubCategory: deleteSubCategory,
  addProduct: addProduct,
  statics: statics,
  updateProduct: updateProduct,
  getListOrder: getListOrder,
};
