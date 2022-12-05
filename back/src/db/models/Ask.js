const AskModel = require("../schemas/ask");

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
    // if (!ask._id) {
    //   throw Error(JSON.stringify({ message: "ask._id is required" }, null, 2));
    // }

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
  delete: (id) => {
    if (!id) {
      throw new Error({ message: "id is required" });
    }

    return AskModel.findByIdAndDelete(id);
  },

  /** userId와 일치하는 게시글 데이터를 조회 */
  findUserAllAsks: async (userId, page) => {
    const allUserAsks = await AskModel.find({ author: userId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * 8)
      .limit(8)
      .lean();

    return allUserAsks;
  },

  /** 검색 단어와 일치하는 게시물을 조회 */
  getAsksByQuestion: async (options, page) => {
    const Asks = await AskModel.find({ $or: options })
      .sort({ createdAt: -1 })
      .skip((page - 1) * 8)
      .limit(8)
      .lean();
    return Asks;
  },
};

module.exports = Ask;
