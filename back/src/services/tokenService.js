const { Token } = require("../db/models/Token");

const tokenService = {
  deleteUserInfo: async (userId) => {
    // models의 delete 함수 실행
    console.log(`토큰 서비스 확인`, userId)
    let deletedTokenInfo = await Token.delete(userId);

    deletedTokenInfo.errorMessage = null;

    return deletedTokenInfo;
  },
};

exports.tokenService = tokenService;