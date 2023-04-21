const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OtpSchema = new Schema(
  {
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, default: "" },
    otp: { type: Number, required: true },
    created: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);
OtpSchema.statics = {
  findUser(email) {
    return this.findOne({ email: email }).exec();
  },
  updateOTP(data) {
    return this.findOneAndUpdate(
      { email: data.email },
      {
        $set: {
          otp: data.otp,
          created: data.created,
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },
  deleteOtpUser(email) {
    return this.findOneAndDelete({ email: email }).exec();
  },
};

module.exports = mongoose.model("Otp", OtpSchema);
