const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    productName: { type: String, required: true },
    code: { type: String, default: "" },
    categoryID: { type: String, required: true },
    subCategoryID: { type: String, default: "" },
    image: [
      {
        url: { type: String },
        publicID: { type: String },
        type: { type: String, default: "image" },
      },
    ],
    brandID: { type: String, default: "" },
    introduce: { type: String, default: "" },
    description: { type: String, default: "" },
    oldPrice: { type: Number, default: 0 },
    price: { type: Number, required: true },
    discount: { type: Boolean, default: false },
    highlight: { type: Boolean, default: false },
    bestSelling: { type: Boolean, default: false },
    new: { type: Boolean, default: false },
    sold: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

ProductSchema.statics = {
  getCountProductCategory(data) {
    return this.countDocuments({
      $and: [
        { subCategoryID: data.categoryID },
        { groupCategoryID: data.groupCategoryID },
        { subGroupCategoryID: data.subGroupCategoryID },
      ],
    });
  },
  getCountProductCategory(categoryID) {
    return this.countDocuments({
      categoryID: categoryID,
    }).exec();
  },
  getCountProductHighlightStore(storeID) {
    return this.countDocuments({
      $and: [{ storeID: storeID }, { highlight: true }],
    }).exec();
  },

  getPagiProductStore(data) {
    return this.find({ storeID: data.storeID })
      .sort({ _id: -1 })
      .limit(16)
      .skip(data.skip)
      .exec();
  },
  getPagiProductHighlightStore(data) {
    return this.find({ storeID: data.storeID, highlight: true })
      .sort({ _id: -1 })
      .limit(16)
      .skip(data.skip)
      .exec();
  },
  getDetailsProduct(id) {
    return this.findOne({ _id: id }).exec();
  },
  getCountProductNewStore(storeID) {
    return this.countDocuments({
      $and: [{ storeID: storeID }, { new: true }],
    }).exec();
  },
  getPagiProductNewStore(data) {
    return this.find({ storeID: data.storeID, new: true })
      .sort({ _id: -1 })
      .limit(16)
      .skip(data.skip)
      .exec();
  },
  getProductCategory(data) {
    return this.find({
      categoryID: data.categoryID,
    })
      .sort({ _id: -1 })
      .limit(18)
      .skip(data.skip)
      .exec();
  },
  getHomeProductType(type) {
    if (type == 1) {
      return this.find({ new: true }).sort({ _id: -1 }).exec();
    } else if (type == 2) {
      return this.find({ bestSelling: true }).sort({ _id: -1 }).limit(4).exec();
    }
  },

  getCountProductFilter(data) {
    if (
      data.subCategoryID != "" &&
      data.branchID != "" &&
      data.price.end != 0
    ) {
      return this.countDocuments({
        $and: [
          { subCategoryID: data.subCategoryID },
          { brandID: data.branchID },
          { price: { $gte: data.price.start, $lte: data.price.end } },
        ],
      }).exec();
    } else if (
      data.subCategoryID != "" &&
      data.branchID == "" &&
      data.price.end == 0
    ) {
      return this.countDocuments({
        subCategoryID: data.subCategoryID,
      }).exec();
    } else if (
      data.subCategoryID == "" &&
      data.branchID != "" &&
      data.price.end == 0
    ) {
      return this.countDocuments({
        branchID: data.branchID,
      }).exec();
    } else if (
      data.subCategoryID == "" &&
      data.branchID == "" &&
      data.price.end != 0
    ) {
      return this.countDocuments({
        price: { $gte: data.price.start, $lte: data.price.end },
      }).exec();
    } else if (
      data.subCategoryID != "" &&
      data.branchID != "" &&
      data.price.end == 0
    ) {
      return this.countDocuments({
        $and: [
          { subCategoryID: data.subCategoryID },
          { brandID: data.branchID },
        ],
      }).exec();
    } else if (
      data.subCategoryID != "" &&
      data.branchID == "" &&
      data.price.end != 0
    ) {
      return this.countDocuments({
        $and: [
          { subCategoryID: data.subCategoryID },
          { price: { $gte: data.price.start, $lte: data.price.end } },
        ],
      }).exec();
    } else if (
      data.subCategoryID == "" &&
      data.branchID != "" &&
      data.price.end != 0
    ) {
      return this.countDocuments({
        $and: [
          { branchID: data.branchID },
          { price: { $gte: data.price.start, $lte: data.price.end } },
        ],
      }).exec();
    }
  },
  getProductFilter(data) {
    if (
      data.subCategoryID != "" &&
      data.branchID != "" &&
      data.price.end != 0
    ) {
      return this.find({
        $and: [
          { categoryID: data.categoryID },
          { subCategoryID: data.subCategoryID },
          { brandID: data.branchID },
          { price: { $gte: data.price.start, $lte: data.price.end } },
        ],
      })
        .sort({ _id: -1 })
        .limit(18)
        .skip(data.skip)
        .exec();
    } else if (
      data.subCategoryID != "" &&
      data.branchID == "" &&
      data.price.end == 0
    ) {
      return this.find({
        categoryID: data.categoryID,
        subCategoryID: data.subCategoryID,
      })
        .sort({ _id: -1 })
        .limit(18)
        .skip(data.skip)
        .exec();
    } else if (
      data.subCategoryID == "" &&
      data.branchID != "" &&
      data.price.end == 0
    ) {
      return this.find({
        categoryID: data.categoryID,
        branchID: data.branchID,
      })
        .sort({ _id: -1 })
        .limit(18)
        .skip(data.skip)
        .exec();
    } else if (
      data.subCategoryID == "" &&
      data.branchID == "" &&
      data.price.end != 0
    ) {
      return this.find({
        categoryID: data.categoryID,
        price: { $gte: data.price.start, $lte: data.price.end },
      })
        .sort({ _id: -1 })
        .limit(18)
        .skip(data.skip)
        .exec();
    } else if (
      data.subCategoryID != "" &&
      data.branchID != "" &&
      data.price.end == 0
    ) {
      return this.find({
        $and: [
          { categoryID: data.categoryID },
          { subCategoryID: data.subCategoryID },
          { brandID: data.branchID },
        ],
      })
        .sort({ _id: -1 })
        .limit(18)
        .skip(data.skip)
        .exec();
    } else if (
      data.subCategoryID != "" &&
      data.branchID == "" &&
      data.price.end != 0
    ) {
      return this.find({
        $and: [
          { categoryID: data.categoryID },
          { subCategoryID: data.subCategoryID },
          { price: { $gte: data.price.start, $lte: data.price.end } },
        ],
      })
        .sort({ _id: -1 })
        .limit(18)
        .skip(data.skip)
        .exec();
    } else if (
      data.subCategoryID == "" &&
      data.branchID != "" &&
      data.price.end != 0
    ) {
      return this.find({
        $and: [
          { categoryID: data.categoryID },
          { branchID: data.branchID },
          { price: { $gte: data.price.start, $lte: data.price.end } },
        ],
      })
        .sort({ _id: -1 })
        .limit(18)
        .skip(data.skip)
        .exec();
    }
  },

  getRelatedProduct(data) {
    return this.find({
      categoryID: data.categoryID,
      subCategoryID: data.subCategoryID,
      brandID: data.branchID,
    })
      .sort({ _id: -1 })
      .limit(4)
      .exec();
  },

  searchProduct(data){
    if(data.categoryID == 'all'){
      return this.find({
        "productName": { "$regex": data.search, "$options": "i" }
      }).sort({_id: -1}).limit(20).exec();
    }else{
      return this.find({
        categoryID: data.categoryID,
        "productName": { "$regex": data.search, "$options": "i" }
      }).sort({_id: -1}).limit(20).exec();
    }
  },

  getAllProduct(){
    return this.find().sort({_id: -1}).exec();
  },

  deleteProduct(id){
    return this.findOneAndDelete({_id:id}).exec();
  },
  updateProduct(data, id){
    console.log(data);
    return this.findOneAndUpdate({_id: id}, {
      $set: {
        productName: data.productName,
        price: data.price,
        code: data.code,
        categoryID: data.categoryID,
        subCategoryID: data.subCategoryID,
        brandID: data.branchID,
        description: data.description,
        introduce: data.introduce,
        image: data.image,
      }
    }, { safe: true, upsert: true, new: true }).exec();
  }
};

module.exports = mongoose.model("Product", ProductSchema);
