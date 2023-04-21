const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DailyDiscoverSchema = new Schema(
  {
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
DailyDiscoverSchema.statics = {
  getHomeDaily() {
    return this.find().sort({ _id: -1 }).limit(4).exec();
  },
};

module.exports = mongoose.model("DailyDiscover", DailyDiscoverSchema);
