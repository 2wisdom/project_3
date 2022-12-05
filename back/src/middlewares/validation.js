const { validationSchema } = require("./validationSchema");
const { deleteUserImage } = require("../middlewares/deleteImage");

const errorMessage = "요청한 데이터 형식이 올바르지 않습니다.";

const userValidation = {
  ValidatePostAddUser: async (req, res, next) => {
    try {
      // 검사시작
      await validationSchema.postAddUserSchema.validateAsync(req.body);
    } catch (error) {
      // 유효성 검사 에러
      const message = error.details.map((element) => element.message).join(",");
      console.log(`errorMessage: `, message);
      return res.status(400).json({ errorMessage: errorMessage });
    }
    next();
  },

  ValidatePostLogin: async (req, res, next) => {
    try {
      await validationSchema.postLoginSchema.validateAsync(req.body);
    } catch (error) {
      const message = error.details.map((element) => element.message).join(",");
      console.log(`errorMessage: `, message);
      return res.status(400).json({ errorMessage: errorMessage });
    }
    next();
  },

  ValidatePutUser: async (req, res, next) => {
    try {
      await validationSchema.putUserSchema.validateAsync(req.body);
    } catch (error) {
      const imageUrl = req.file?.path ?? null;

      if (imageUrl) {
        await deleteUserImage(imageUrl);
      }

      const message = error.details.map((element) => element.message).join(",");
      console.log(`errorMessage: `, message);
      return res.status(400).json({ errorMessage: errorMessage });
    }
    next();
  },
};

exports.userValidation = userValidation;
