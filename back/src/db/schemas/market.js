const { number } = require("joi");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Types = mongoose.Types;

const MarketSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => String(new Types.ObjectId()),
    },
    title: {
      type: String,
      required: true,
    },
    contents: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      ref: "User",
    },
    imageUrl: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

MarketSchema.plugin(mongoosePaginate);

module.exports = Market = mongoose.model("market", MarketSchema);