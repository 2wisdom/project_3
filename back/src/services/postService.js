const Post = require("../db/models/Post");

const postService = {
  getPostsByQuestionService: async (option, question, page) => {
    const options = [];
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
    await Post.getPostsByQuestion(options, page);
    return;
  },
};
exports.postService = postService;
