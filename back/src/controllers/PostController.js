const mongoose = require("mongoose");
const postService = require("../services/postServiece");

// 전체 게시글 조회
exports.getAllPosts = async (req, res) => {
  try {
    console.log("전체 게시글 조회");
    const posts = await postService.getAllPosts();
    res.json({ data: posts, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 게시글 생성
exports.createPost = async (req, res) => {
  try {
    console.log("게시글 생성");
    const post = await postService.createPost(req.body);
    res.json({ data: post, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 특정 게시글 조회
exports.getPostById = async (req, res) => {
  try {
    console.log("특정 게시글 조회");
    const { postId } = req.params;
    const post = await postService.getPostById(postId);
    res.json({ data: post, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 게시글 수정
exports.updatePost = async (req, res) => {
  try {
    console.log("게시글 수정");
    const { postId } = req.params;
    const post = await postService.updatePost(postId, req.body);
    res.json({ data: post, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 게시글 삭제
exports.deletePost = async (req, res) => {
  try {
    console.log("게시글 삭제");
    const { postId } = req.params;
    const post = await postService.deletePost(postId);
    res.json({ data: post, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
