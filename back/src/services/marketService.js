const Market = require("../db/models/Market");
const { wrapper } = require("../middlewares/errorHandlingWrapper");

const marketService = {
  getMarketsByQuestionService: async (option, question, page) => {
    try {
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
      const searchedMarkets = await wrapper(
        Market.getMarketsByQuestion,
        options,
        page
      );

      if (searchedMarkets.length === 0) {
        searchedMarkets.markets = "게시물 없음";
        return searchedMarkets;
      }

      searchedMarkets.errorMessage = null;

      return searchedMarkets;
    } catch (error) {
      return error;
    }
  },
};
exports.marketService = marketService;
