const express = require("express");

const {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/PostController");

const router = express.Router();

router.route("/posts").get(getAllPosts).post(createPost);

router
  .route("/posts/:postId")
  .get(getPostById)
  .put(updatePost)
  .delete(deletePost);

module.exports = router;
