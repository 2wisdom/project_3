const CommentModel = require("../schemas/comment");
const PostModel = require("../schemas/post");
const MarketModel = require("../schemas/market");
const AskModel = require("../schemas/ask");
const logger = require("../../config/logger");

// // 고유 아이디 키 이름인 _id를 commentId로 교체
// const responseInfo = (commentInfo) => {
//   if (userInfo) {
//     const comment = { commentId: commentInfo._id, ...commentInfo };
//     delete comment._id;
//     return comment;
//   }
// };

const Comment = {
  findUserAllComments: async (writer, page, type) => {
    try {
      const findUserAllComments = await CommentModel.find({
        writer: writer,
        postType: type,
      })
        .sort({ createdAt: -1 })
        .skip((page - 1) * process.env.PAGE_LIMIT_COUNT)
        .limit(process.env.PAGE_LIMIT_COUNT)
        .lean();

      return findUserAllComments;
    } catch (error) {
      return error;
    }
  },

  findUserAllCommentsCount: async (writer, type) => {
    try {
      const allUserCommentsCount = await CommentModel.countDocuments({
        writer: writer,
        postType: type,
      }).lean();

      return allUserCommentsCount;
    } catch (error) {
      return error;
    }
  },

  deleteByAuthor: async (writer) => {
    try {
      const deletedUserInfo = await CommentModel.deleteMany({
        writer,
      });

      return deletedUserInfo;
    } catch (error) {
      return error;
    }
  },

  deleteAllByWritingId: (writingId) => {
    try {
      return CommentModel.deleteMany({
        writingId,
      });
    } catch (err) {
      logger.error(err);
    }
  },
};

exports.Comment = Comment;
