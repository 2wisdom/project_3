const Market = require("../db/models/Market");

const marketService = {
  getMarketsByQuestionService: async (option, question, page) => {
    let options = [];

    if (option === "title") {
      options = [{ title: new RegExp(question) }];
    } else if (option === "contents") {
      options = [{ contents: new RegExp(question) }];
    } else if (option === "all") {
      options = [
        { title: new RegExp(question) },
        { contents: new RegExp(question) },
      ];
    } else {
      throw new Error("검색 옵션이 없습니다.");
    }
    const searchedMarkets = await Market.getmarketsByQuestion(options, page);

    if (searchedMarkets.length === 0) {
      searchedMarkets.markets = "게시물 없음";
      return searchedMarkets;
    }

    searchedMarkets.errorMessage = null;

    return searchedMarkets;
  },
};
exports.marketService = marketService;
