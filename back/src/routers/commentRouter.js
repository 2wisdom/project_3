const express = require("express");
const Comment = require("../db/schemas/commnet");
const commentRouter = express.Router();
const { loginRequired } = require("../middlewares/login_required");
const { commentController } = require("../controllers/CommentController");

/**
 * 댓글 생성
 * POST /comments/saveComment
 */
commentRouter.post(
  "/saveComment",
  [loginRequired],
  commentController.createComment
);

module.exports = commentRouter;
