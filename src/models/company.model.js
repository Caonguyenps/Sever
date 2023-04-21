const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const CompanySchema = new Schema(
  {
    companyName: { type: String, required: true },
    acronym: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    created: { type: Date, default: Date.now },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

CompanySchema.statics = {
  getCompanyById(id) {
    return this.findOne({ _id: id }).exec();
  },
  getListsCompany() {
    return this.find().sort({ _id: -1 }).exec();
  },
  checkCompany(data) {
    return this.findOne({
      $or: [{ email: data.email }, { acronym: data.acronym }],
    }).exec();
  },
  checkAcronym(acronym) {
    return this.findOne({ acronym: acronym }).exec();
  },
  updateCompany(data, companyID) {
    return this.findByIdAndUpdate(
      companyID,
      {
        $set: {
          companyName: data.companyName,
          acronym: data.acronym,
          address: data.address,
          phoneNumber: data.phoneNumber,
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },
};

module.exports = mongoose.model("Company", CompanySchema);
module.exports.hashPassword = async (password) => {
  console.log(password);
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log(error);
    throw new Error("Hashing failed");
  }
};
