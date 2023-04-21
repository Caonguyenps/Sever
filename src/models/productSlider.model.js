const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSliderSchema = new Schema(
  {
    companyID: { type: String, default: "" },
    productName: { type: String, required: true },
    code: { type: String, default: "" },
    categoryID: { type: String, default: "" },
    subCategoryID: { type: String, default: "" },
    image: [
      {
        url: { type: String },
        publicID: { type: String },
        type: { type: String, default: "image" },
      },
    ],
    description: { type: String, default: "" },
    oldPrice: { type: Number, default: 0 },
    price: { type: Number, required: true },
    unit: { type: String, default: "" },
    // discount: { type: Boolean, default: false },
    // highlight: { type: Boolean, default: false },
    // bestSelling: { type: Boolean, default: false },
    // new: { type: Boolean, default: false },
    // sold: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

ProductSliderSchema.statics = {
  getAllProduct() {
    return this.find().sort({ _id: -1 }).exec();
  },
  getProductCategory(categoryID) {
    if (categoryID == "all") {
      return this.find().sort({ _id: -1 }).exec();
    } else {
      return this.find({ categoryID: categoryID }).sort({ _id: -1 }).exec();
    }
  },
  getDetailsProduct(id) {
    return this.findOne({ _id: id }).exec();
  },
  getCountProduct(id) {
    if (id == "all") {
      return this.countDocuments().exec();
    } else {
      return this.countDocuments({ companyID: id }).exec();
    }
  },
  getProductPagi(data) {
    if (data.companyID == "all") {
      return this.find().sort({ _id: -1 }).limit(16).skip(data.skip).exec();
    } else {
      return this.find({ companyID: data.companyID })
        .sort({ _id: -1 })
        .limit(16)
        .skip(data.skip)
        .exec();
    }
  },
  searchProduct(data) {
    if (data.companyID == "all") {
      return this.find({
        name: { $regex: data.search, $options: "i" },
      }).exec();
    } else {
      return this.find({
        companyID: data.companyID,
        name: { $regex: data.search, $options: "i" },
      }).exec();
    }
  },
};

module.exports = mongoose.model("ProductSlider", ProductSliderSchema);
