const express = require("express");
const Ask = require("../db/models/Ask");
const { loginRequired } = require("../middlewares/login_required");
const { askController } = require("../controllers/askController");
const askRouter = express.Router();
const path = require("path");
const { Router } = require("express");

/**
 * 전체 게시글 조회
 * GET /asks
 */
askRouter.get("/", askController.getAllAsks);

/**
 * 특정 게시물 조회
 * GET /asks/:askId
 */
askRouter.get("/:askId", askController.getAskById);

/**
 * 게시글 생성
 * POST /asks
 */
askRouter.post("/", [loginRequired], askController.createAsk);

/**
 * 게시글 수정
 * PUT /asks/:askId
 */
askRouter.put("/:askId", [loginRequired], askController.updateAsk);

/**
 * 게시글 삭제
 * DELETE /asks/:askId
 */
askRouter.delete("/:askId", [loginRequired], askController.deleteAsk);

module.exports = askRouter;
