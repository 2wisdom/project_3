const express = require("express");

const Post = require("../db/models/Post");
const { postService } = require("../services/postService");
const { wrapper } = require("../middlewares/errorHandlingWrapper");

const postController = {
  // 전체 게시글 조회
  getAllPosts: async (req, res) => {
    console.log("전체 게시글 조회");

    const { page = "1", limit = "8" } = req.query;

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

  // 게시물 검색
  getPostsByQuestionController: async (req, res, next) => {
    try {
      const { option } = req.query;
      const { question } = req.query;
      const { page } = req.query;

      const searchedPosts = await wrapper(
        postService.getPostsByQuestionService,
        option,
        question,
        page
      );
      if (searchedPosts.errorMessage) throw new Error("게시물 조회 실패");

      if (searchedPosts.posts) {
        return res.status(404).send("게시물 없음");
      }

      res.status(200).send(searchedPosts);
    } catch (error) {
      next(error);
    }
  },
};

exports.postController = postController;
