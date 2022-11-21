const express = require("express");
const Post = require("../db/models/Post");
const { loginRequired } = require("../middlewares/login_required");

const postController = {
  // 전체 게시글 조회
  getAllPosts: async (req, res) => {
    const { page = "1", limit = "10" } = req.query;

    const list = await Post.findAll({
      page,
      limit,
      sort: {
        createdAt: -1,
      },
    });

    return res.json(list);
  },

  // 특정 게시글 조회
  getPostById: async (req, res) => {
    const { postId } = req.params;
    const post = await Post.get(postId).populate([
      { path: "author", select: ["_id", "email", "name"] },
    ]);

    return res.json(post);
  },

  // 게시글 작성
  createPost: async (req, res) => {
    const post = req.body;
    post.author = req.currentUserId;

    const newPost = await Post.create(post);

    return res.json({
      id: newPost.id,
    });
  },

  // 게시글 수정
  updatePost: async (req, res, next) => {
    const post = req.body;
    const { postId } = req.params;

    const getPost = await Post.get(postId);

    if (getPost.author !== req.currentUserId) {
      return res.status(401).json({
        message: "수정 권한이 없습니다.",
      });
    }

    let result = null;

    try {
      result = await Post.update(post);
    } catch (err) {
      return next(err.message);
    }

    return res.json(result);
  },

  // 게시글 삭제
  deletePost: async (req, res) => {
    const { postId } = req.params;

    await Post.delete(postId);

    return res.json({
      id: postId,
    });
  },
};

exports.postController = postController;
