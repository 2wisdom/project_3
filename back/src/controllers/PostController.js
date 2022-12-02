const express = require("express");
const Post = require("../db/models/Post");

const postController = {
  // 전체 게시글 조회
  getAllPosts: async (req, res) => {
    console.log("전체 게시글 조회");

    const { page = "1", limit = "10" } = req.query;

    const list = await Post.findAll({
      page,
      limit,
      sort: {
        createdAt: -1,
      },
      populate: {
        path: "author",
        select: ["_id", "name", "imageUrl"],
      },
    });

    try {
      return res.json(list);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Error");
    }
  },

  // 특정 게시글 조회
  getPostById: async (req, res, next) => {
    console.log("특정 게시글 조회");

    const { postId } = req.params;

    const post = await Post.get(postId).populate([
      { path: "author", select: ["_id", "name", "imageUrl"] },
    ]);

    try {
      const copyPost = { ...post.toJSON() };
      return res.json(copyPost);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Error");
    }
  },

  // 게시글 생성
  createPost: async (req, res) => {
    console.log("게시글 작성");
    const post = req.body;
    post.author = req.currentUserId;

    try {
      const newPost = await Post.create(post);
      return res.json({
        newPost,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send("Error");
    }
  },

  // 게시글 수정
  updatePost: async (req, res, next) => {
    console.log("게시글 수정");
    const post = req.body;
    const { postId } = req.params;

    const getPost = await Post.get(postId);

    if (getPost.author !== req.currentUserId) {
      return res.status(401).json({
        message: "수정 권한이 없습니다.",
      });
    }

    try {
      let result = null;
      post._id = postId;
      result = await Post.update(post);

      return res.json(result);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Error");
    }
  },

  // 게시글 삭제
  deletePost: async (req, res) => {
    console.log("게시글 삭제");
    const { postId } = req.params;

    const getPost = await Post.get(postId);
    if (getPost.author !== req.currentUserId) {
      return res.status(401).json({
        message: "삭제 권한이 없습니다.",
      });
    }

    await Post.delete(postId);

    try {
      return res.json({
        id: postId,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send("Error");
    }
  },
};

exports.postController = postController;
