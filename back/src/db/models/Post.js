const PostModel = require("../schemas/post");

const Post = {
  /**
   * 전체 포스트를 조회한다
   */
  findAll: (params) => {
    return PostModel.paginate({}, params);
  },

  /**
   * 포스트를 생성한다
   * @param {*} post
   */
  create: (post) => {
    if (!!post.id) {
      throw new Error({ message: "invalid pass property post.id" });
    }

    if (!post.author) {
      throw new Error({
        message: "author is required",
      });
    }

    return PostModel.create(post);
  },

  /**
   * 특정 포스트 상세정보를 조회한다
   *
   * @param {string} id
   */
  get: (id) => {
    if (!id) {
      throw new Error({ message: "id is required" });
    }

    return PostModel.findOne({ _id: id });
  },

  /**
   * 포스트를 수정한다
   */
  update: (post) => {
    if (!post._id) {
      throw Error(JSON.stringify({ message: "post._id is required" }, null, 2));
    }

    return PostModel.findByIdAndUpdate(
      post._id,
      {
        ...post,
      },
      { new: true }
    );
  },

  /**
   * 포스트를 삭제한다
   */
  delete: (id) => {
    if (!id) {
      throw new Error({ message: "id is required" });
    }

    return PostModel.findByIdAndDelete(id);
  },
};

module.exports = Post;
