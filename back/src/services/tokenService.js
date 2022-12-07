const { Token } = require("../db/models/Token");

const tokenService = {
  deleteTokenInfo: async (userId) => {
    try {
      // models의 delete 함수 실행
      let deletedTokenInfo = await Token.deleteByUserId(userId);

      deletedTokenInfo.errorMessage = null;

      return deletedTokenInfo;
    } catch (error) {
      return error;
    }
  },
};

exports.tokenService = tokenService;
