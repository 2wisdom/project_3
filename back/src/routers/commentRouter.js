const express = require("express");
const Comment = require("../db/schemas/comment");
const commentRouter = express.Router();
const { loginRequired } = require("../middlewares/login_required");
const { commentController } = require("../controllers/commentController");

/**
 * 댓글 조회
 * GET /comments
 */
commentRouter.get("/:writingId", commentController.getComments);

/**
 * 댓글 생성
 * POST /comments
 */
commentRouter.post(
  "/:writingId",
  [loginRequired],
  commentController.createComment
);

/**
 * 댓글 삭제
 * DELETE /comments
 */
commentRouter.delete("/", [loginRequired], commentController.deleteComment);

module.exports = commentRouter;
