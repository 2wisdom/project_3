const express = require("express");
const Post = require("../db/models/Post");
const { loginRequired } = require("../middlewares/login_required");
const { postController } = require("../controllers/postController");

const postRouter = express.Router();

/**
 * GET /posts
 */
postRouter.get("/", postController.getAllPosts);

/**
 * GET /posts/:postId
 */
postRouter.get("/:postId", postController.getPostById);

/**
 * POST /posts
 */
postRouter.post("/", [loginRequired], postController.createPost);

/**
 * POST /posts/:postId
 */
postRouter.put("/:postId", [loginRequired], postController.updatePost);

/**
 * DELETE /posts/:postId
 */
postRouter.delete("/:postId", [loginRequired], postController.deletePost);

module.exports = postRouter;
