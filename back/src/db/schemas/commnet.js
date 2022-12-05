const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema(
  {
    // 댓글 작성자
    writer: {
      type: String,
      required: true,
      ref: "User",
    },
    // 해당 게시글 ID
    writingId: {
      type: String,
      required: true,
      // ref: "Post",
    },
    // reply to
    responseTo: {
      type: String,
      ref: "User",
    },
    // 댓글 내용
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Comment = mongoose.model("comment", CommentSchema);
