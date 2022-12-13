const express = require("express");

const { postController } = require("../controllers/PostController");
const { marketController } = require("../controllers/marketController");
const { askController } = require("../controllers/askController");
const { searchValidation } = require("../middlewares/validation");

const searchRouter = express.Router();

// 자랑하기 게시글 검색
searchRouter.get(
  "/posts?:option?:question?:page",
  searchValidation.ValidateGetSearch,
  postController.getPostsByQuestionController
);

// 마켓 게시글 검색
searchRouter.get(
  "/markets?:option?:question?:page",
  searchValidation.ValidateGetSearch,
  marketController.getMarketsByQuestionController
);

// 질문하기 게시글 검색
searchRouter.get(
  "/asks?:option?:question?:page",
  searchValidation.ValidateGetSearch,
  askController.getAsksByQuestionController
);

exports.searchRouter = searchRouter;
