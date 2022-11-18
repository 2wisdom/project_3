const { default: mongoose } = require("mongoose");
const PostModel = require("../db/models/Post");

// 전체 게시글 조회
exports.getAllPosts = async () => {
  const result = await PostModel.find();
  return result;
};

// 게시글 생성
exports.createPost = async (post) => {
  const result = await PostModel.create(post);
  return result;
};

// 특정 게시글 조회
exports.getPostById = async (postId) => {
  const _id = new mongoose.Types.ObjectId(postId);
  const result = await PostModel.findOne({
    _id: _id,
  });
  return result;
  // .populate("name")
};

// 게시글 수정
exports.updatePost = async (postId, body) => {
  // const _id = new mongoose.Types.ObjectId(postId);
  // Model.findByIdAndUpdate(id, { name: 'jason bourne' }, options, callback)
  const result = await PostModel.findByIdAndUpdate(
    postId,
    {
      title: body.title,
      contents: body.contents,
    },
    { new: true }
  );
  return result;
};

// 게시글 삭제
exports.deletePost = async (postId) => {
  await PostModel.findByIdAndDelete(postId);
  return;
};
