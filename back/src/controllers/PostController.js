const express = require("express");
const Post = require("../db/models/Post");
const os = require("os");

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
    });

    return res.json(list);
  },

  // 특정 게시글 조회
  getPostById: async (req, res) => {
    console.log("특정 게시글 조회");

    const { postId } = req.params;
    const post = await Post.get(postId).populate([
      { path: "author", select: ["_id", "email", "name"] },
    ]);

    //
    const copyPost = { ...post.toJSON() };

    return res.json(copyPost);
  },

  // 이미지 업로드
  uploadImage: async (req, res) => {
    if (!req.headers["content-type"].startsWith("multipart/form-data")) {
      throw Error({ message: "Content-Type once multipart/form-data" });
    }

    const isWindow = os.platform() === "win32";

    const url = `${req.protocol}://${req.hostname}${
      parseInt(process.env.SERVER_PORT, 10) === 80
        ? ""
        : `:${process.env.SERVER_PORT}`
    }`;

    let path = req.file.path;

    // support window
    if (isWindow) {
      path = path.split("\\").join("/");
    }

    const resolveUrl = `${url}/${path}`;

    return res.json({
      url: resolveUrl,
    });
  },

  // 게시글 작성
  createPost: async (req, res) => {
    console.log("게시글 작성");
    const post = req.body;
    author = req.body.currentUserId;
    // console.log("req.body", req.body);
    // console.log("author", req.body.author);

    const newPost = await Post.create(post);

    return res.json({
      id: newPost.id,
    });
  },

  // 게시글 수정
  updatePost: async (req, res, next) => {
    console.log("게시글 수정");
    const post = req.body;
    const { postId } = req.params;

    const getPost = await Post.get(postId);

    console.log("해당 포스트 내용", getPost);
    console.log("수정할 포스트 내용", req.body);

    // if (getPost.author !== req.currentUserId) {
    //   return res.status(401).json({
    //     message: "수정 권한이 없습니다.",
    //   });
    // }

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
    console.log("게시글 삭제");
    const { postId } = req.params;

    await Post.delete(postId);

    return res.json({
      id: postId,
    });
  },
};

exports.postController = postController;
