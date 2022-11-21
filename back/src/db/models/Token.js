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
  create: async (newToken) => {
    // console.log(`토큰 모델 확인1: `,newToken)

    // newUser을 몽고디비에 생성
    let createdNewToken = await TokenModel.create(newToken);

    // console.log(`토큰 모델 확인2: `,newToken) 

    // Moogoose Document에서 필요한 응답에 필요한 _doc 만 responseInfo 로 전달
    if (createdNewToken) createdNewToken = responseInfo(createdNewToken._doc);

    return createdNewToken;
  },
};

exports.Token = Token;
