const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeliveryAddressSchema = new Schema(
  {
    ownerID: { type: String, required: true },
    province: { type: String, required: true },
    district: { type: String, required: true },
    wards: { type: String, default: "" },
    address: { type: String, required: true },
    created: { type: Date, defalt: Date.now },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);
DeliveryAddressSchema.statics = {
  getAddressUser(ownerID) {
    return this.find({ ownerID: ownerID }).exec();
  },
  findAddressByID(addressID) {
    return this.findById(addressID).exec();
  },
  updateDeliveryAddress(data) {
    return this.findByIdAndUpdate(
      data.addressID,
      {
        $set: {
          province: data.province,
          district: data.district,
          wards: data.wards,
          address: data.address,
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },
  deleteDeliveryAddress(addressID) {
    return this.findByIdAndDelete(addressID).exec();
  },
};

module.exports = mongoose.model("DeliveryAddress", DeliveryAddressSchema);
