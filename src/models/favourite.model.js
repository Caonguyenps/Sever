const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavouriteSchema = new Schema(
  {
    ownerID: { type: String, required: true },
    productID: { type: String, required: true },
    created: { type: Date, default: Date.now },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

FavouriteSchema.statics = {
  checkFavourite(data) {
    return this.findOne({
      ownerID: data.ownerID,
      productID: data.productID,
    }).exec();
  },
  deleteFavourite(id) {
    return this.findByIdAndDelete(id).exec();
  },
  getfavouriteUser(ownerID) {
    return this.find({ ownerID: ownerID }).sort({ _id: -1 }).exec();
  },
};

module.exports = mongoose.model("Favourite", FavouriteSchema);
