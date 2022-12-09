const express = require("express");
const Comment = require("../db/schemas/comment");
const logger = require("../config/logger");

const commentController = {
  // 댓글 조회
  getComments: (req, res) => {
    const { writingId } = req.params;

    Comment.find({ writingId })
      .populate([{ path: "writer", select: ["_id", "name", "imageUrl"] }])
      .exec((err, comments) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, comments });
        logger.info("댓글 조회");
      });
  },

  // 댓글 생성
  createComment: (req, res) => {
    const comment = new Comment(req.body);
    const { writingId } = req.params;

    comment.writingId = writingId;
    comment.writer = req.currentUserId;

    comment.save((err, comment) => {
      if (err) return res.json({ success: false, err });

      Comment.find({ _id: comment._id }) // 저장 후 id를 이용하여 바로 해당 writer정보를 찾는다.
        .populate([{ path: "writer", select: ["_id", "name", "imageUrl"] }])
        .exec((err, result) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json({ success: true, result });
          logger.info("댓글 생성");
        });
    });
  },

  // 댓글 삭제
  deleteComment: async (req, res) => {
    const { commentId } = req.params;

    Comment.findByIdAndDelete(commentId).exec((err) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({ success: true });
      logger.info("댓글 삭제");
    });
  },
};

exports.commentController = commentController;
