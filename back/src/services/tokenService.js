const { Token } = require("../db/models/Token");
const { wrapper } = require("../middlewares/errorHandlingWrapper");

const tokenService = {
  deleteTokenInfo: async (userId) => {
    try {
      // models의 delete 함수 실행
      const deletedTokenInfo = await wrapper(Token.deleteByUserId, userId);

      deletedTokenInfo.errorMessage = null;

      return deletedTokenInfo;
    } catch (error) {
      return error;
    }
  },
};

exports.tokenService = tokenService;
