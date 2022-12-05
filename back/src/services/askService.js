const Ask = require("../db/models/Ask");

const askService = {
  getAsksByQuestionService: async (option, question, page) => {
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
    const searchedAsks = await Ask.getAsksByQuestion(options, page);

    if (searchedAsks.length === 0) {
      searchedAsks.asks = "게시물 없음";
      return searchedAsks;
    }

    searchedAsks.errorMessage = null;

    return searchedAsks;
  },
};
exports.askService = askService;
