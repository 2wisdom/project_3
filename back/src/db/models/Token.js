const { TokenModel } = require("../schemas/token");

// 고유 아이디 키 이름인 _id를 userId로 교체
const responseInfo = (tokenInfo) => {
  if (tokenInfo) {
    const token = { tokenId: tokenInfo._id, ...tokenInfo };
    delete token._id;
    return token;
  }
};

const Token = {
  create: async (newToken) => {
    let createdNewToken = await TokenModel.create(newToken);

    // Moogoose Document에서 필요한 응답에 필요한 _doc 만 responseInfo 로 전달
    if (createdNewToken) createdNewToken = responseInfo(createdNewToken._doc);

    return createdNewToken;
  },

  // 고유 Id 로 데이터 검색
  findByUserId: async (userId) => {
    // 생성과 수정 날짜 데이터를 제외한 _id, email, name만 user에 초기화
    let user = await TokenModel.findOne(
      { userId },
      "_id refreshToken userId"
    ).lean();

    if (user) user = responseInfo(user);
    if (!user) user = null
    return user;
  },

  // 회원 정보 수정 {유저고유 아이디, 변경할 항목, 변경될 데이터}
  update: async ({ tokenId, fieldToUpdate, newValue }) => {
    const filter = { _id: tokenId };
    const update = {
      [fieldToUpdate.refreshToken]: newValue.refreshToken,
      [fieldToUpdate.userId]: newValue.userId,
    };

    // 업데이트 전 데이터를 리턴하지 말고 업데이트 후 데이터를 리턴
    const option = { returnOriginal: false };

    let updatedToken = await TokenModel.findOneAndUpdate(
      filter,
      update,
      option
    ).lean();
    return updatedToken;
  },
};

exports.Token = Token;
