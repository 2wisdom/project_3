const { validationSchema } = require("./validationSchema");
const { deleteUserImage } = require("../middlewares/deleteImage");

const userValidation = {
  ValidatePostAddUser: async (req, res, next) => {
    try {
      // 검사시작
      await validationSchema.postAddUserSchema.validateAsync(req.body);
    } catch (error) {
      // 유효성 검사 에러
      const message = error.details.map((element) => element.message).join(",");
      return res.status(400).json({ code: 400, message: message });
    }
    next();
  },

  ValidatePostLogin: async (req, res, next) => {
    try {
      await validationSchema.postLoginSchema.validateAsync(req.body);
    } catch (error) {
      const message = error.details.map((element) => element.message).join(",");
      return res.status(400).json({ code: 400, message: message });
    }
    next();
  },

  ValidatePutUser: async (req, res, next) => {
    try {
      await validationSchema.putUserSchema.validateAsync(req.body);
    } catch (error) {
      const imageUrl = req.file?.path ?? null;
      await deleteUserImage(imageUrl);
      const message = error.details.map((element) => element.message).join(",");
      return res.status(400).json({ code: 400, message: message });
    }
    next();
  },
};

exports.userValidation = userValidation;
