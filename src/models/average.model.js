const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AverageSchema = new Schema(
  {
    id: { type: String, required: true },
    rating: {
      total: { type: Number, default: 0 },
      star: { type: Number, default: 0 },
      avg: { type: Number, default: 0 },
    },
    productSold: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    type: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

AverageSchema.statics = {
  getAverage(id) {
    return this.findOne({ id: id }).exec();
  },
  getPageAverage(skip, type) {
    return this.find({ type: type })
      .sort({ "rating.avg": -1 })
      .limit(16)
      .skip(skip)
      .exec();
  },
  updateView(id) {
    return this.findOneAndUpdate(
      { id: id },
      {
        $inc: {
          views: 1,
        },
      }
    ).exec();
  },
};

module.exports = mongoose.model("Average", AverageSchema);
