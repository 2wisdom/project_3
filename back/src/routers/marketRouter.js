const express = require("express");
const Market = require("../db/models/Market");
const { loginRequired } = require("../middlewares/login_required");
const { marketController } = require("../controllers/marketController");
const marketRouter = express.Router();
const path = require("path");
const { Router } = require("express");

/**
 * 전체 게시글 조회
 * GET /markets
 */
marketRouter.get("/", marketController.getAllMarkets);

/**
 * 특정 게시물 조회
 * GET /markets/:marketId
 */
marketRouter.get("/:marketId", marketController.getMarketById);

/**
 * 게시글 생성
 * POST /markets
 */
marketRouter.post("/", [loginRequired], marketController.createMarket);

/**
 * 게시글 수정
 * PUT /markets/::marketId
 */
marketRouter.put("/:marketId", [loginRequired], marketController.updateMarket);

/**
 * 게시글 삭제
 * DELETE /markets/::marketId
 */
marketRouter.delete(
  "/:marketId",
  [loginRequired],
  marketController.deleteMarket
);

module.exports = marketRouter;
