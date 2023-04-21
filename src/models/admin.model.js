const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const AdminSchema = new Schema(
  {
    fullName: { type: String, default: "" },
    avatar: {
      url: { type: String, default: "" },
      publicID: { type: String, default: "" },
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
    created: { type: Date, default: Date.now },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

AdminSchema.methods = {
  comparePassword(password) {
    return bcrypt.compare(password, this.password);
  },
};

AdminSchema.statics = {
  findUserByEmail(email) {
    return this.findOne({ email: email }).exec();
  },
  findUserByID(id) {
    return this.findOne({ _id: id }).exec();
  },
  updatePassword(id, password) {
    return this.findByIdAndUpdate(
      id,
      {
        $set: {
          password: password,
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },
};

module.exports = mongoose.model("Admin", AdminSchema);
module.exports.hashPassword = async (password) => {
  console.log(password);
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error("Hashing failed");
  }
};
