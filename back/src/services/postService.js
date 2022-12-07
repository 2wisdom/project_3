const Post = require("../db/models/Post");

const postService = {
  getPostsByQuestionService: async (option, question, page) => {
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

      const searchedPosts = await wrapper(
        Post.getPostsByQuestion,
        options,
        page
      );

      if (searchedPosts.length === 0) {
        searchedPosts.posts = "게시물 없음";
        return searchedPosts;
      }

      searchedPosts.errorMessage = null;

      return searchedPosts;
    } catch (error) {
      return error;
    }
  },
};
exports.postService = postService;
