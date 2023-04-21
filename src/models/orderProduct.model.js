const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderProductSchema = new Schema(
  {
    fullName: { type: String, required: true },
    phoneNumber: { type: String, default: "" },
    address: { type: String, default: "" },
    listsProduct: [
      {
        productID: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    confirm: { type: Boolean, default: false },
    payment: { type: Boolean, default: false },
    created: { type: Number, required: true },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

OrderProductSchema.statics = {
  getDetailsOrder(orderID) {
    return this.findOne({ _id: orderID }).exec();
  },
  getAllOrder() {
    return this.find().sort({ created: -1 }).exec();
  },
  getListOrderType(type) {
    if (type == 1) {
      return this.find({ confirm: false }).sort({ created: -1 }).exec();
    } else if (type == 2) {
      return this.find({ confirm: true }).sort({ created: -1 }).exec();
    }
  },
  removeProductOrder(data) {
    return this.findOneAndUpdate(
      { _id: data.orderID },
      {
        $pull: {
          listsProduct: {
            productID: data.productID,
          },
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },
  confirmOrder(data) {
    return this.findOneAndUpdate(
      { _id: data.orderID },
      {
        $set: {
          fullName: data.fullName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          confirm: true,
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },
  deleteOrder(orderID) {
    return this.findOneAndDelete({ _id: orderID }).exec();
  },
  updateQuantityOrder(data) {
    console.log(data);
    return this.findOneAndUpdate(
      { _id: data.orderID, "listsProduct._id": data.productID },
      {
        $set: {
          "listsProduct.$.quantity": data.quantity,
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },
};

module.exports = mongoose.model("OrderProduct", OrderProductSchema);
