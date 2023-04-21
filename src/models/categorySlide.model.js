const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySlideSchema = new Schema(
  {
    categoryName: { type: String, trim: true },
    subCategory: [
      {
        subCategoryName: { type: String, trim: true },
        created: { type: Date, default: Date.now },
      },
    ],
    created: { type: Date, default: Date.now },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);
CategorySlideSchema.statics = {
  getListsCategory() {
    return this.find().exec();
  },
};

module.exports = mongoose.model("CategorySlide", CategorySlideSchema);
