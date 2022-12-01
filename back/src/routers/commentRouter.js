const express = require("express");
const Comment = require("../db/schemas/commnet");
const commentRouter = express.Router();
const { loginRequired } = require("../middlewares/login_required");
const { commentController } = require("../controllers/CommentController");

/**
 * 댓글 조회
 * GET /comments/getComments
 */
commentRouter.get(
  "/getComments",
  [loginRequired],
  commentController.getComments
);

/**
 * 댓글 생성
 * POST /comments/comment
 */
commentRouter.post(
  "/comment",
  [loginRequired],
  commentController.createComment
);

module.exports = commentRouter;
