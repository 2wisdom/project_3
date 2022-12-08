const express = require("express");

const { postController } = require("../controllers/postController");
const { marketController } = require("../controllers/marketController");
const { askController } = require("../controllers/askController");

const searchRouter = express.Router();

// 자랑하기 게시글 검색
searchRouter.get(
  "/posts?:option?:question?:page",
  postController.getPostsByQuestionController
);

// 마켓 게시글 검색
searchRouter.get(
  "/markets?:option?:question?:page",
  marketController.getMarketsByQuestionController
);

// 질문하기 게시글 검색
searchRouter.get(
  "/asks?:option?:question?:page",
  askController.getAsksByQuestionController
);

exports.searchRouter = searchRouter;
