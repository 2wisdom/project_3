const { UserModel } = require("../schemas/user");

const { wrapper } = require("../../middlewares/errorHandlingWrapper");

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
    try {
      // newUser을 몽고디비에 생성
      let createdNewUser = await UserModel.create(newUser);

      // Moogoose Document에서 필요한 응답에 필요한 _doc 만 responseInfo 로 전달
      if (createdNewUser) createdNewUser = responseInfo(createdNewUser._doc);

      return createdNewUser;
    } catch (error) {
      return error;
    }
  },

  // email 로 데이터 검색
  findByEmail: async (email) => {
    try {
      console.log(email);
      // 생성과 수정 날짜 데이터를 제외한 _id, email, password, name만 user에 초기화
      let user = await UserModel.findOne(
        { email },
        "_id email password name imageUrl"
        // mongoose document를 필요한 javascript object로 반환
      ).lean();
      console.log(user);
      // 고유 아이디 키 이름인 _id를 userId로 교체
      if (user) user = responseInfo(user);
      console.log(user);

      return user;
    } catch (error) {
      return error;
    }
  },

  // name 로 데이터 검색
  findByName: async (name) => {
    // 생성과 수정 날짜 데이터를 제외한 _id, email, password, name만 user에 초기화
    let user = await UserModel.findOne(
      { name },
      "_id email password name imageUrl"
      // mongoose document를 필요한 javascript object로 반환
    ).lean();
    // 고유 아이디 키 이름인 _id를 userId로 교체
    if (user) user = responseInfo(user);

    return user;
  },

  // 고유 Id 로 데이터 검색
  findById: async (userId) => {
    // 생성과 수정 날짜 데이터를 제외한 _id, email, name만 user에 초기화
    let user = await UserModel.findById(
      { _id: userId },
      "_id email password name imageUrl"
    ).lean();

    if (user) user = responseInfo(user);

    return user;
  },

  // 회원 정보 수정 {유저고유 아이디, 변경할 항목, 변경될 데이터}
  update: async ({ userId, fieldToUpdate, newValue }) => {
    const filter = { _id: userId };
    const update = {
      [fieldToUpdate.password]: newValue.newPassword,
      [fieldToUpdate.imageUrl]: newValue.imageUrl,
    };

    // 업데이트 전 데이터를 리턴하지 말고 업데이트 후 데이터를 리턴
    const option = { returnOriginal: false };

    let updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    ).lean();

    if (updatedUser) updatedUser = responseInfo(updatedUser);

    return updatedUser;
  },

  // 회원 정보 삭제
  delete: async (userId) => {
    //_id 가 넘어온 유저 고유 아이디와 일치하는 데이터를 삭제
    const deletedUserInfo = await UserModel.findByIdAndDelete({ _id: userId });

    return deletedUserInfo;
  },
};

exports.User = User;
