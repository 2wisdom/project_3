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
      required: true,
      ref: "User",
      type: String,
    },
  },
  { timestamps: true }
);

PostSchema.plugin(mongoosePaginate);

module.exports = Post = mongoose.model("post", PostSchema);
