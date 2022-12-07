const Ask = require("../db/models/Ask");
const { wrapper } = require("../middlewares/errorHandlingWrapper");

const askService = {
  getAsksByQuestionService: async (option, question, page) => {
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
      const searchedAsks = await wrapper(Ask.getAsksByQuestion, options, page);

      if (searchedAsks.length === 0) {
        searchedAsks.asks = "게시물 없음";
        return searchedAsks;
      }

      searchedAsks.errorMessage = null;

      return searchedAsks;
    } catch (error) {
      return error;
    }
  },
};
exports.askService = askService;
