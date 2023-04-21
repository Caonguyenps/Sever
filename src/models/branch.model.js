const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BranchSchema = new Schema(
  {
    branchName: { type: String, required: true },
    listsCategory: [
      {
        categoryID: { type: String, required: true },
        created: { type: Date, default: Date.now },
      },
    ],
    details: { type: String, default: "" },
    created: { type: Date, default: Date.now },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

BranchSchema.statics = {
  updateBranchName(data) {
    return this.findByIdAndUpdate(
      data.branchID,
      {
        $set: {
          branchName: data.branchName,
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },
  addCategoryBranch(data) {
    return this.findByIdAndUpdate(
      data.branchID,
      {
        $push: {
          listsCategory: {
            categoryID: data.categoryID,
          },
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },
  checkCategoryBranch(data) {
    return this.findOne({
      _id: data.branchID,
      "listsCategory.categoryID": data.categoryID,
    }).exec();
  },
  deleteBranch(branchID) {
    return this.findByIdAndDelete(branchID).exec();
  },
  deleteCategoryBranch(data) {
    return this.findByIdAndUpdate(
      data.branchID,
      {
        $pull: {
          listsCategory: {
            categoryID: data.categoryID,
          },
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },
  getBranchCategory(categoryID) {
    return this.find({ "listsCategory.categoryID": categoryID }).exec();
  },
  getAllBranch() {
    return this.find().exec();
  },
  getDetailsBranch(branchID) {
    return this.findOne({ _id: branchID }).exec();
  },
};

module.exports = mongoose.model("Branch", BranchSchema);
