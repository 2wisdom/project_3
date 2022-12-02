const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Types = mongoose.Types;

const PostSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

PostSchema.plugin(mongoosePaginate);

module.exports = Post = mongoose.model("post", PostSchema);
