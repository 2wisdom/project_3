const express = require("express");
const Comment = require("../db/schemas/commnet");

const commentController = {
  // 댓글 생성
  createComment: (req, res) => {
    const comment = new Comment(req.body);
    comment.save((err, comment) => {
      if (err) return res.json({ success: false, err });

      Comment.find({ _id: comment._id }) // 저장 후 id를 이용하여 바로 해당 writer정보를 찾는다.
        .populate("writer")
        .exec((err, result) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json({ success: true, result });
        });
    });
  },
};

exports.commentController = commentController;
