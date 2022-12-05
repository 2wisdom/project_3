const express = require("express");

const { postController } = require("../controllers/postController");

const searchRouter = express.Router();

/**
 * 게시글 검색
 */
searchRouter.get(
  "/posts?:option?:question?:page",
  postController.getPostsByQuestionController
);

exports.searchRouter = searchRouter;
