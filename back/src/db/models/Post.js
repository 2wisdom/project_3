const PostModel = require("../schemas/post");
const { Comment } = require("./Comment");
const { db } = require("../../db");
const { default: mongoose } = require("mongoose");

const Post = {
  /**
   * 전체 포스트를 조회한다
   */
  findAll: (params) => {
    return PostModel.paginate({}, params);
  },

  /**
   * 포스트를 생성한다
   * @param {*} post
   */
  create: (post) => {
    if (!!post.id) {
      throw new Error("invalid pass property post.id");
    }

    if (!post.author) {
      throw new Error("author is required");
    }

    return PostModel.create(post);
  },

  /**
   * 특정 포스트 상세정보를 조회한다
   *
   * @param {string} id
   */
  get: (id) => {
    if (!id) {
      throw new Error({ message: "id is required" });
    }

    return PostModel.findOne({ _id: id });
  },

  /**
   * 포스트를 수정한다
   */
  update: (post) => {
    return PostModel.findByIdAndUpdate(
      post._id,
      {
        ...post,
      },
      { new: true }
    );
  },

  /**
   * 포스트를 삭제한다
   */
  delete: async (id) => {
    if (!id) {
      throw new Error({ message: "id is required" });
    }
    await Comment.deleteAllByWritingId(id);
    return PostModel.findByIdAndDelete(id);
  },

  // userId와 일치하는 게시글 데이터를 조회
  findUserAllPosts: async (userId, page) => {
    try {
      const allUserPosts = await PostModel.find({ author: userId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * process.env.PAGE_LIMIT_COUNT)
        .limit(process.env.PAGE_LIMIT_COUNT)
        .lean();

      return allUserPosts;
    } catch (error) {
      return error;
    }
  },

  // userId와 일치하는 게시글 데이터 개수 조회
  findUserAllPostsCount: async (userId) => {
    try {
      const allUserPostsCount = await PostModel.countDocuments({
        author: userId,
      }).lean();

      return allUserPostsCount;
    } catch (error) {
      return error;
    }
  },

  // 검색 단어와 일치하는 게시물을 조회
  getPostsByQuestion: async (options, page) => {
    console.log(options, page);
    try {
      const Posts = await PostModel.find({ $or: options })
        .sort({ createdAt: -1 })
        .skip((page - 1) * process.env.PAGE_LIMIT_COUNT)
        .limit(process.env.PAGE_LIMIT_COUNT)
        .populate({ path: "author", select: ["_id", "name", "imageUrl"] })
        .lean();
      return Posts;
    } catch (error) {
      return error;
    }
  },

  getPostsByQuestionCount: async (options) => {
    try {
      const PostsCount = await PostModel.countDocuments({
        $or: options,
      }).lean();
      return PostsCount;
    } catch (error) {
      return error;
    }
  },

  deleteByAuthor: async (userId) => {
    try {
      const deletedUserInfo = await PostModel.deleteMany({
        author: userId,
      });
      return deletedUserInfo;
    } catch (error) {
      return error;
    }
  },
};

module.exports = Post;
