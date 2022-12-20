const express = require("express");

const Post = require("../db/models/Post");
const { postService } = require("../services/postService");
const { wrapper } = require("../middlewares/errorHandlingWrapper");
const { writeLog } = require("../middlewares/writeLog");
const fs = require("fs");
const path = require("path");

const Comment = require("../db/schemas/comment");
const logger = require("../config/logger");
const { wisXFileCleanerFromUrl } = require("../libs/wisXFileCleaner");

const postController = {
  // 전체 게시글 조회
  getAllPosts: async (req, res, next) => {
    const { page = "1", limit = "6" } = req.query;

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
      logger.info("전체 게시글 조회");
      return res.json(list);
    } catch (err) {
      next(err);
    }
  },

  // 특정 게시글 조회
  getPostById: async (req, res, next) => {
    const { postId } = req.params;

    const post = await Post.get(postId).populate([
      { path: "author", select: ["_id", "name", "imageUrl"] },
    ]);

    try {
      if (post == null) {
        return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
      }

      logger.info("특정 게시글 조회");
      return res.json(post);
    } catch (err) {
      next(err);
    }
  },

  // 게시글 생성
  createPost: async (req, res, next) => {
    const post = req.body;
    post.author = req.currentUserId;

    try {
      const newPost = await Post.create(post);
      logger.info("게시글 작성");
      return res.json({
        newPost,
      });
    } catch (err) {
      next(err);
    }
  },

  // 게시글 수정
  updatePost: async (req, res, next) => {
    const post = req.body;
    const { postId } = req.params;

    const getPost = await Post.get(postId);

    try {
      if (getPost == null) {
        return res.status(404).json({
          message: "게시글을 찾을 수 없습니다.",
        });
      } else if (getPost.author !== req.currentUserId) {
        return res.status(401).json({
          message: "수정 권한이 없습니다.",
        });
      }

      post._id = postId;
      let result = await Post.update(post);

      logger.info("게시글 수정");
      return res.json(result);
    } catch (err) {
      next(err);
    }
  },

  // 게시글 삭제
  deletePost: async (req, res, next) => {
    const { postId } = req.params;

    const getPost = await Post.get(postId);

    try {
      if (getPost == null) {
        return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
      } else if (getPost.author !== req.currentUserId) {
        return res.status(401).json({
          message: "삭제 권한이 없습니다.",
        });
      }

      await Post.delete(postId);
    } catch (err) {
      next(err);
    }

    // 파일 삭제
    try {
      const imageUrl = getPost.imageUrl;
      wisXFileCleanerFromUrl(new URL(imageUrl));
    } catch (err) {
      next(err);
    }

    try {
      logger.info("게시글 삭제");
      return res.json({
        id: postId,
      });
    } catch (err) {
      next(err);
    }
  },

  // 게시물 검색
  getPostsByQuestionController: async (req, res, next) => {
    const { option } = req.query;
    const { question } = req.query;
    const { page } = req.query;
    try {
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

      writeLog("info", question, req, "질문하기 검색 성공");
      res.status(200).send(searchedPosts);
    } catch (error) {
      next(error);
    }
  },
};

exports.postController = postController;
