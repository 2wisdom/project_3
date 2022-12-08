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
    },
    // 댓글 내용
    content: {
      type: String,
      required: true,
    },
    // 비밀댓글
    isSecret: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = Comment = mongoose.model("comment", CommentSchema);
