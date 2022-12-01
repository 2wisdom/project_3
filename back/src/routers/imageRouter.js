const express = require("express");
const image = require("../db/schemas/image");
const { loginRequired } = require("../middlewares/login_required");
const { imageController } = require("../controllers/imageController");
const imageRouter = express.Router();
const path = require("path");
const { Router } = require("express");

/**
 * 게시글 이미지 생성
 * POST /image-upload
 */
imageRouter.post("/image-upload", [loginRequired], imageController.uploadImage);

module.exports = imageRouter;
