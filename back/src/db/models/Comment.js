const CommentModel = require("../schemas/comment");
const PostModel = require("../schemas/post");
const MarketModel = require("../schemas/market");
const AskModel = require("../schemas/ask");

// // 고유 아이디 키 이름인 _id를 commentId로 교체
// const responseInfo = (commentInfo) => {
//   if (userInfo) {
//     const comment = { commentId: commentInfo._id, ...commentInfo };
//     delete comment._id;
//     return comment;
//   }
// };

const Comment = {
  findUserAllComments: async (writer, page) => {
    try {
      const findUserAllComments = await CommentModel.find({ writer })
        .sort({ createdAt: -1 })
        .skip((page - 1) * process.env.PAGE_LIMIT_COUNT)
        .limit(process.env.PAGE_LIMIT_COUNT)
        .lean();

      return findUserAllComments;
    } catch (error) {
      return error;
    }
  },

  findUserAllCommentsCount: async (writer) => {
    try {
      const allUserCommentsCount = await CommentModel.countDocuments({
        writer,
      }).lean();

      return allUserCommentsCount;
    } catch (error) {
      return error;
    }
  },

  deleteAllByWritingId: (writingId) => {
    try {
      return CommentModel.deleteMany({
        writingId,
      });
    } catch (e) {}
  },
};

exports.Comment = Comment;
