const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsSchema = new Schema(
  {
    categoryID: { type: String, required: true },
    title: { type: String, required: true },
    images: [
      {
        url: { type: String, required: true },
        publicID: { type: String, required: true },
      },
    ],
    content: { type: String, required: true },
    created: { type: Date, default: Date.now },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);
NewsSchema.statics = {
  getListsNews(data) {
    return this.find({ categoryID: data.categoryID })
      .sort({ _id: -1 })
      .limit(data.limit)
      .skip(data.skip)
      .exec();
  },
  getCountNewsCategory(categoryID) {
    return this.countDocuments({ categoryID: categoryID }).exec();
  },
  getDetailsNews(newsID) {
    return this.findById(newsID).exec();
  },
};

module.exports = mongoose.model("News", NewsSchema);
