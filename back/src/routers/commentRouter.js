const express = require("express");
const Comment = require("../db/schemas/comment");
const commentRouter = express.Router();
const { loginRequired } = require("../middlewares/login_required");
const { commentController } = require("../controllers/CommentController");

/**
 * 댓글 조회
 * GET /comments/:writingId
 */
commentRouter.get("/:writingId", commentController.getComments);

/**
 * 댓글 생성
 * POST /comments/:writingId
 */
commentRouter.post(
  "/:writingId",
  [loginRequired],
  commentController.createComment
);

/**
 * 댓글 삭제
 * DELETE /comments/:commentId
 */
commentRouter.delete(
  "/:commentId",
  [loginRequired],
  commentController.deleteComment
);

module.exports = commentRouter;
