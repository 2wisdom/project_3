const express = require("express");
const Comment = require("../db/schemas/commnet");

const commentController = {
  // 댓글 조회
  getComments: (req, res) => {
    console.log("댓글 조회");
    Comment.find({ writingId: req.body.writingId })
      .populate([{ path: "writer", select: ["_id", "name", "imageUrl"] }])
      .exec((err, comments) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, comments });
      });
  },

  // 댓글 생성
  createComment: (req, res) => {
    console.log("댓글 생성");
    const comment = new Comment(req.body);
    comment.save((err, comment) => {
      if (err) return res.json({ success: false, err });

      Comment.find({ _id: comment._id }) // 저장 후 id를 이용하여 바로 해당 writer정보를 찾는다.
        .populate([{ path: "writer", select: ["_id", "name", "imageUrl"] }])
        .exec((err, result) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json({ success: true, result });
        });
    });
  },

  // 댓글 삭제
  deleteComment: (req, res) => {
    console.log("댓글 삭제");
  },
};

exports.commentController = commentController;
