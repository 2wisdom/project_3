const CommentModel = require("../schemas/comment");

const Comment = {
  findUserAllComments: async (userId, page) => {
    try {
      const findUserAllComments = await CommentModel.find({ writer: userId })

        .sort({ createdAt: -1 })
        .skip((page - 1) * process.env.PAGE_LIMIT_COUNT)
        .limit(process.env.PAGE_LIMIT_COUNT)
        .populate({
          path: "writingId",
          select: ["_id", "title", "contents", "imageUrl"],
        })
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
};

exports.Comment = Comment;
