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
      maxLength: 20,
      required: true,
    },
    contents: {
      type: String,
      maxLength: 600,
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
    // 구근/뿌리묘/모종, 다육식물, 씨앗, 기타
    category: {
      type: String,
      required: true,
    },
    isSoldOut: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

MarketSchema.plugin(mongoosePaginate);

module.exports = Market = mongoose.model("market", MarketSchema);
