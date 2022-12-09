const CommentModel = require("../schemas/comment");

const Comment = {
  findUserAllComments: async (userId, page) => {
    try {
      const findUserAllComments = await CommentModel.find({ writer: userId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * process.env.PAGE_LIMIT_COUNT)
        .limit(process.env.PAGE_LIMIT_COUNT)
        .lean();

      return findUserAllComments;
    } catch (error) {
      return error;
    }
  },

  findUserAllCommentsCount: async (userId) => {
    try {
      const allUserCommentsCount = await CommentModel.countDocuments({
        author: userId,
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
