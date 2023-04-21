const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BannerSchema = new Schema(
  {
    image: {
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/ecommercestore/image/upload/v1656665841/banner/Banner_l8t2cc.png",
      },
      publicID: { type: String, default: "" },
    },
    type: { type: String, default: "" },
    toID: { type: String, default: "" },
    bannerTitle: { type: String, required: true },
    bannerContent: { type: String, required: true },
    created: { type: Date, default: Date.now },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

BannerSchema.statics = {
  getBanner() {
    return this.find().exec();
  },
};

module.exports = mongoose.model("Banner", BannerSchema);
