const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    categoryName: { type: String, trim: true },
    subCategory: [
      {
        subCategoryName: { type: String, trim: true },
        created: { type: Date, default: Date.now },
      },
    ],
    type: { type: String, required: true },
    created: { type: Date, default: Date.now },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);
CategorySchema.statics = {
  getListsCategory(type) {
    return this.find({ type: type }).exec();
  },
  getDetailsCategory(categoryID) {
    return this.findOne({ _id: categoryID }).exec();
  },
  getDetailsSubCategory(subCategoryID, categoryID) {
    return this.findOne(
      { _id: categoryID,"subCategory._id": subCategoryID },
      { categoryName: 1, "subCategory.$": 1 }
    ).exec();
  },
  addSubCategory(data) {
    return this.findByIdAndUpdate(
      data.categoryID,
      {
        $push: {
          subCategory: {
            subCategoryName: data.subCategoryName,
          },
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },
  updateCategory(data) {
    return this.findByIdAndUpdate(
      data.categoryID,
      {
        $set: {
          categoryName: data.categoryName,
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },
  updateSubCategory(data) {
    console.log(data);
    return this.findOneAndUpdate(
      { "subCategory._id": data.subCategoryID },
      {
        $set: {
          "subCategory.$.subCategoryName": data.subCategoryName,
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },
  deleteCategory(categoryID) {
    return this.findByIdAndDelete(categoryID).exec();
  },
  deleteSubCategory(data) {
    console.log(data);
    return this.findByIdAndUpdate(
      data.categoryID,
      {
        $pull: {
          subCategory: {
            _id: data.subCategoryID,
          },
        },
      },
      { safe: true, upsert: true, new: true }
    ).exec();
  },
};

module.exports = mongoose.model("Category", CategorySchema);
