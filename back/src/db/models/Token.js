const { TokenModel } = require("../schemas/token");

// 고유 아이디 키 이름인 _id를 userId로 교체
const responseInfo = (tokenInfo) => {
  if (tokenInfo) {
    const token = { tokenInfo: tokenInfo._id, ...tokenInfo };
    delete token._id;
    return token;
  }
};

const Token = {
  /**
   *
   * @param {object} newToken
   * @param {string} newToken.userId
   * @param {string} newToken.refreshToken
   * @returns
   */
  create: async (newToken) => {
    console.log("newToken: ", newToken);
    // newUser을 몽고디비에 생성
    let createdNewToken = await TokenModel.findOneAndUpdate(
      {
        userId: newToken.userId,
      },
      {
        refreshToken: newToken.refreshToken,
      },
      {
        new: true,
        upsert: true,
      }
    );
    // let createdNewToken = await TokenModel.create(newToken);

    // Moogoose Document에서 필요한 응답에 필요한 _doc 만 responseInfo 로 전달
    if (createdNewToken) createdNewToken = responseInfo(createdNewToken._doc);

    return createdNewToken;
  },
};

exports.Token = Token;
