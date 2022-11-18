const mongoose = require("mongoose");
const Types = mongoose.Types;

const PostSchema = new mongoose.Schema({
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
  // timestamps: true
});

module.exports = Post = mongoose.model("post", PostSchema);
