const MarketModel = require("../schemas/market");

const Market = {
  /**
   * 전체 포스트를 조회한다
   */
  findAll: (params) => {
    return MarketModel.paginate({}, params);
  },

  /**
   * 포스트를 생성한다
   * @param {*} market
   */
  create: (market) => {
    if (!!market.id) {
      throw new Error("invalid pass property market.id");
    }

    if (!market.author) {
      throw new Error("author is required");
    }

    return MarketModel.create(market);
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

    return MarketModel.findOne({ _id: id });
  },

  /**
   * 포스트를 수정한다
   */
  update: (market) => {
    // if (!market._id) {
    //   throw Error(JSON.stringify({ message: "market._id is required" }, null, 2));
    // }

    return MarketModel.findByIdAndUpdate(
      market._id,
      {
        ...market,
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

    return MarketModel.findByIdAndDelete(id);
  },

  // userId와 일치하는 게시글 데이터를 조회
  findUserAllMarkets: async (userId, page) => {
    try {
      const allUserMarkets = await MarketModel.find({ author: userId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * process.env.PAGE_LIMIT_COUNT)
        .limit(process.env.PAGE_LIMIT_COUNT)
        .lean();

      return allUserMarkets;
    } catch (error) {
      return error;
    }
  },

  // userId와 일치하는 게시글 데이터 개수 조회
  findUserAllMarketsCount: async (userId) => {
    try {
      const allUserMarketsCount = await MarketModel.countDocuments({
        author: userId,
      }).lean();

      return allUserMarketsCount;
    } catch (error) {
      return error;
    }
  },

  // 검색 단어와 일치하는 게시물을 조회
  getMarketsByQuestion: async (options, page) => {
    try {
      const Markets = await MarketModel.find({ $or: options })
        .sort({ createdAt: -1 })
        .skip((page - 1) * process.env.PAGE_LIMIT_COUNT)
        .limit(process.env.PAGE_LIMIT_COUNT)
        .populate({ path: "author", select: ["_id", "name", "imageUrl"] })
        .lean();
      return Markets;
    } catch (error) {
      return error;
    }
  },

  getMarketsByQuestionCount: async (options) => {
    try {
      const MarketsCount = await MarketModel.countDocuments({
        $or: options,
      }).lean();

      return MarketsCount;
    } catch (error) {
      return error;
    }
  },
};

module.exports = Market;
