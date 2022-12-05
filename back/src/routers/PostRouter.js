const express = require("express");
const Post = require("../db/models/Post");
const { loginRequired } = require("../middlewares/login_required");
const { postController } = require("../controllers/postController");
const postRouter = express.Router();
const path = require("path");
const { Router } = require("express");

/**
 * 전체 게시글 조회
 * GET /posts
 */
postRouter.get("/", postController.getAllPosts);

/**
 * 특정 게시물 조회
 * GET /posts/:postId
 */
postRouter.get("/:postId", postController.getPostById);

/**
 * 게시글 생성
 * POST /posts
 */
postRouter.post("/", [loginRequired], postController.createPost);

/**
 * 게시글 수정
 * PUT /posts/:postId
 */
postRouter.put("/:postId", [loginRequired], postController.updatePost);

/**
 * 게시글 삭제
 * DELETE /posts/:postIda
 */
postRouter.delete("/:postId", [loginRequired], postController.deletePost);

module.exports = postRouter;
