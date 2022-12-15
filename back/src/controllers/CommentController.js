const express = require("express");
const Comment = require("../db/schemas/comment");
const { writeLog } = require("../middlewares/writeLog");
const logger = require("../config/logger");
const CommentModel = require("../db/models/Comment");

const commentController = {
  // 댓글 조회
  getComments: async (req, res, next) => {
    const { writingId } = req.params;

    const comment = await Comment.find({ writingId }).populate([
      { path: "writer", select: ["_id", "name", "imageUrl"] },
    ]);
    try {
      logger.info("댓글 조회");
      return res.json({ comments: comment });
    } catch (err) {
      next(err);
    }
  },

  // 댓글 생성
  createComment: async (req, res, next) => {
    const { writingId } = req.params;
    const comment = req.body;
    comment.writingId = writingId;
    comment.writer = req.currentUserId;

    try {
      const newComment = await (
        await Comment.create(comment)
      ).populate([{ path: "writer", select: ["_id", "name", "imageUrl"] }]);
      logger.info("댓글 생성");
      return res.json({ newComment });
    } catch (err) {
      next(err);
    }
  },

  // 댓글 삭제
  deleteComment: async (req, res, next) => {
    const { commentId } = req.params;
    try {
      const comment = await Comment.findById(commentId);

      if (comment == null) {
        return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
      } else if (comment.writer !== req.currentUserId) {
        return res.status(401).json({
          message: "삭제 권한이 없습니다.",
        });
      }

      await Comment.findByIdAndDelete(commentId);

      logger.info("댓글 삭제");
      return res.json({ commentId });
    } catch (err) {
      next(err);
    }
  },
};

exports.commentController = commentController;
