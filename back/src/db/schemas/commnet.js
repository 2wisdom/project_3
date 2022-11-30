const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema(
  {
    // 댓글 작성자
    writer: {
      type: String,
      ref: "User",
    },
    // 게시글 ID
    writingId: {
      type: String,
      ref: "Post",
    },
    // reply to
    responseTo: {
      type: String,
      ref: "User",
    },
    // 댓글 내용
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = Comment = mongoose.model("comment", CommentSchema);
