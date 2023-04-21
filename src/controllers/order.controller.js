const orderHelper = require("../helpers/order.helper");

const OrderProduct = async (req, res) => {
  try {
    const data = {
      listsProduct: req.body.listsProduct,
      totalPrice: req.body.totalPrice,
      created: new Date().getTime(),
      fullName: req.body.customerName,
    };
    await orderHelper
      .OrderProduct(data)
      .then(() => {
        return res.status(200).json({ result: true });
      })
      .catch((error) => {
        return res.status(500).json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: "get product category failed" });
  }
};

const getListsOrder = async (req, res) => {
  try {
    await orderHelper
      .getListsOrder()
      .then((result) => {
        return res.status(200).json({ result: true, data: result });
      })
      .catch((error) => {
        return res.status(500).json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: "get product category failed" });
  }
};

const getDetailsOrder = async (req, res) => {
  try {
    const orderID = req.params.orderID;
    await orderHelper
      .getDetailsOrder(orderID)
      .then((result) => {
        return res.status(200).json({ result: true, data: result });
      })
      .catch((error) => {
        return res.status(500).json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: "get product category failed" });
  }
};

const getListsCompany = async (req, res) => {
  try {
    await orderHelper
      .getListsCompany()
      .then((result) => {
        return res.status(200).json({ result: true, data: result });
      })
      .catch((error) => {
        return res.status(500).json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: "get product category failed" });
  }
};

const getListOrderType = async (req, res) => {
  try {
    const type = parseInt(req.params.type);
    await orderHelper
      .getListOrderType(type)
      .then((result) => {
        return res.status(200).json({ result: true, data: result });
      })
      .catch((error) => {
        return res.status(500).json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: "get product category failed" });
  }
};

const removeProductOrder = async (req, res) => {
  try {
    const data = {
      orderID: req.body.orderID,
      productID: req.body.productID,
    };
    await orderHelper
      .removeProductOrder(data)
      .then((result) => {
        return res.status(200).json({ result: true, data: result });
      })
      .catch((error) => {
        return res.status(500).json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: "get product category failed" });
  }
};

const updateQuantityOrder = async (req, res) => {
  try {
    const data = {
      orderID: req.body.orderID,
      productID: req.body.productID,
      quantity: req.body.quantity,
    };
    await orderHelper
      .updateQuantityOrder(data)
      .then((result) => {
        return res.status(200).json({ result: true, data: result });
      })
      .catch((error) => {
        return res.status(500).json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: "get product category failed" });
  }
};

const confirmOrder = async (req, res) => {
  try {
    const data = {
      orderID: req.body.orderID,
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
    };
    await orderHelper
      .confirmOrder(data)
      .then((result) => {
        return res.status(200).json({ result: true, data: result });
      })
      .catch((error) => {
        return res.status(500).json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: "get product category failed" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderID = req.params.orderID;
    await orderHelper
      .deleteOrder(orderID)
      .then((result) => {
        return res.status(200).json({ result: true, data: result });
      })
      .catch((error) => {
        return res.status(500).json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: "get product category failed" });
  }
};

const createCompany = async (req, res) => {
  try {
    const data = {
      companyName: req.body.companyName,
      acronym: req.body.acronym,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      email: req.body.email,
    };
    await orderHelper
      .createCompany(data)
      .then((result) => {
        return res.status(200).json({ result: true, data: result });
      })
      .catch((error) => {
        return res
          .status(error.status)
          .json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: "create company failed" });
  }
};

const getDetailsCompany = async (req, res) => {
  try {
    const companyID = req.params.companyID;
    await orderHelper
      .getDetailsCompany(companyID)
      .then((result) => {
        return res.status(200).json({ result: true, data: result });
      })
      .catch((error) => {
        return res.status(500).json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: "create company failed" });
  }
};

const updateCompany = async (req, res) => {
  try {
    const companyID = req.params.companyID;
    const data = {
      companyName: req.body.companyName,
      acronym: req.body.acronym,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
    };
    await orderHelper
      .updateCompany(data, companyID)
      .then((result) => {
        return res.status(200).json({ result: true, data: result });
      })
      .catch((error) => {
        return res
          .status(error.status)
          .json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: "create company failed" });
  }
};

const getProductCompany = async (req, res) => {
  try {
    const data = {
      companyID: req.params.companyID,
      page: req.params.page,
    };
    await orderHelper
      .getProductCompany(data)
      .then((result) => {
        return res.status(200).json({ result: true, data: result });
      })
      .catch((error) => {
        return res.status(500).json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: "create company failed" });
  }
};

const searchProduct = async (req, res) => {
  try {
    const data = {
      companyID: req.params.companyID,
      search: req.params.search,
    };
    await orderHelper
      .searchProduct(data)
      .then((result) => {
        return res.status(200).json({ result: true, data: result });
      })
      .catch((error) => {
        return res.status(500).json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: "create company failed" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const data = {
      oldPassword: req.body.oldPassword,
      newPassword: req.body.newPassword,
      confirmPassword: req.body.confirmPassword,
    };
    await orderHelper
      .updatePassword(data)
      .then((result) => {
        return res.status(200).json({ result: true, data: result });
      })
      .catch((error) => {
        return res
          .status(error.status)
          .json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: "create company failed" });
  }
};

module.exports = {
  OrderProduct: OrderProduct,
  getListsOrder: getListsOrder,
  getDetailsOrder: getDetailsOrder,
  getListsCompany: getListsCompany,
  getListOrderType: getListOrderType,
  removeProductOrder: removeProductOrder,
  updateQuantityOrder: updateQuantityOrder,
  confirmOrder: confirmOrder,
  deleteOrder: deleteOrder,
  createCompany: createCompany,
  getDetailsCompany: getDetailsCompany,
  updateCompany: updateCompany,
  getProductCompany: getProductCompany,
  searchProduct: searchProduct,
  updatePassword: updatePassword,
};
