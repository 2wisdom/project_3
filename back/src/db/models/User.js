const { UserModel } = require("../schemas/user");

// 고유 아이디 키 이름인 _id를 userId로 교체
const responseInfo = (userInfo) => {
  if (userInfo) {
    const user = { userId: userInfo._id, ...userInfo };
    delete user._id;
    return user;
  }
};

const User = {
  // 회원가입
  create: async (newUser) => {
    // newUser을 몽고디비에 생성
    let createdNewUser = await UserModel.create(newUser);

    // Moogoose Document에서 필요한 응답에 필요한 _doc 만 responseInfo 로 전달
    if (createdNewUser) createdNewUser = responseInfo(createdNewUser._doc);

    return createdNewUser;
  },

  // email 로 데이터 검색
  findByEmail: async (email) => {
    // 생성과 수정 날짜 데이터를 제외한 _id, email, password, name만 user에 초기화
    let user = await UserModel.findOne(
      { email },
      "_id email password name"
    ).lean();
    // mongoose document를 필요한 javascript object로 반환

    // 고유 아이디 키 이름인 _id를 userId로 교체
    if (user) user = responseInfo(user);

    return user;
  },

  // 고유 Id 로 데이터 검색
  findById: async (userId) => {

    // 생성과 수정 날짜 데이터를 제외한 _id, email, name만 user에 초기화
    let user = await UserModel.findOne({ userId }, "_id email name").lean();

    if (user) user = responseInfo(user);

    return user;
  },

  update: async ({ userId, fieldToUpdate, newValue }) => {

    const filter = { _id: userId };
    const update = { [fieldToUpdate]: newValue }
    const option = { returnOriginal: false };


    let updatedUser = await UserModel.findOneAndUpdate(filter, update, option).lean();
    


    return updatedUser;
  },
};

exports.User = User;
