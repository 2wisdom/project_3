const { validationSchema } = require("./validationSchema");
const { deleteUserImage } = require("../middlewares/deleteImage");
const { wrapper } = require("../middlewares/errorHandlingWrapper");

const errorMessage = "요청한 데이터 형식이 올바르지 않습니다.";

const errorFunction = (res, error) => {
  const message = error.details.map((element) => element.message).join(",");
  console.log(`errorMessage: `, message);
};

const userValidation = {
  // 회원가입
  ValidatePostAddUser: async (req, res, next) => {
    try {
      await validationSchema.postAddUserSchema.validateAsync(req.body);
    } catch (error) {
      errorFunction(res, error);
      return res.status(400).json({ errorMessage: errorMessage });
    }
    next();
  },

  // 로그인
  ValidatePostLogin: async (req, res, next) => {
    try {
      await validationSchema.postLoginSchema.validateAsync(req.body);
    } catch (error) {
      errorFunction(res, error);
      return res.status(400).json({ errorMessage: errorMessage });
    }
    next();
  },

  // 유저 정보 수정
  ValidatePutUser: async (req, res, next) => {
    try {
      await validationSchema.putUserSchema.validateAsync(req.body);
    } catch (error) {
      const imageUrl = req.file?.path ?? null;

      if (imageUrl) {
        await wrapper(deleteUserImage, imageUrl);
      }

      errorFunction(res, error);
      return res.status(400).json({ errorMessage: errorMessage });
    }
    next();
  },
};

const searchValidation = {
  // 게시판 검색
  ValidateGetSearch: async (req, res, next) => {
    try {
      await validationSchema.getSearchSchema.validateAsync(req.query);
    } catch (error) {
      errorFunction(res, error);
      return res.status(400).json({ errorMessage: errorMessage });
    }
    next();
  },
};

exports.userValidation = userValidation;
exports.searchValidation = searchValidation;
