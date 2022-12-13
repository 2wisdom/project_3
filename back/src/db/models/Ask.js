const AskModel = require("../schemas/ask");
const { Comment } = require("./Comment");
const { db } = require("../../db");
const { default: mongoose } = require("mongoose");

const Ask = {
  /**
   * 전체 포스트를 조회한다
   */
  findAll: (params) => {
    return AskModel.paginate({}, params);
  },

  /**
   * 포스트를 생성한다
   * @param {*} ask
   */
  create: (ask) => {
    if (!!ask.id) {
      throw new Error("invalid pass property ask.id");
    }

    if (!ask.author) {
      throw new Error("author is required");
    }

    return AskModel.create(ask);
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

    return AskModel.findOne({ _id: id });
  },

  /**
   * 포스트를 수정한다
   */
  update: (ask) => {
    return AskModel.findByIdAndUpdate(
      ask._id,
      {
        ...ask,
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
    return AskModel.findByIdAndDelete(id);
  },

  // userId와 일치하는 게시글 데이터를 조회
  findUserAllAsks: async (userId, page) => {
    try {
      const allUserAsks = await AskModel.find({ author: userId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * process.env.PAGE_LIMIT_COUNT)
        .limit(process.env.PAGE_LIMIT_COUNT)
        .lean();

      return allUserAsks;
    } catch (error) {
      return error;
    }
  },

  // userId와 일치하는 게시글 데이터 개수 조회
  findUserAllAsksCount: async (userId) => {
    try {
      const allUserAsksCount = await AskModel.countDocuments({
        author: userId,
      }).lean();

      return allUserAsksCount;
    } catch (error) {
      return error;
    }
  },

  //  검색 단어와 일치하는 게시물을 조회
  getAsksByQuestion: async (options, page) => {
    try {
      const Asks = await AskModel.find({ $or: options })
        .sort({ createdAt: -1 })
        .skip((page - 1) * process.env.PAGE_LIMIT_COUNT)
        .limit(process.env.PAGE_LIMIT_COUNT)
        .populate({ path: "author", select: ["_id", "name", "imageUrl"] })
        .lean();
      return Asks;
    } catch (error) {
      return error;
    }
  },

  // 검색 단어와 일치하는 게시물 개수 조회
  getAsksByQuestionCount: async (options) => {
    try {
      const AsksCount = await AskModel.countDocuments({
        $or: options,
      }).lean();

      return AsksCount;
    } catch (error) {
      return error;
    }
  },

  deleteByAuthor: async (userId) => {
    try {
      const deletedUserInfo = await AskModel.deleteMany({
        author: userId,
      });
      return deletedUserInfo;
    } catch (error) {
      return error;
    }
  },
};

module.exports = Ask;
