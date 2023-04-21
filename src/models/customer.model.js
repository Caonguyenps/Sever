const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    customerName: { type: String, required: true },
    content: { type: String, required: true },
    created: { type: Date, default: Date.now },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);
CustomerSchema.statics = {
  getCustomerTalk() {
    return this.find().sort({ _id: -1 }).exec();
  },
};

module.exports = mongoose.model("Customer", CustomerSchema);
