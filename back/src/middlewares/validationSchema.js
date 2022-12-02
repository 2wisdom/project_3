const Joi = require("joi");

const validationSchema = {
  // 회원가입 유효성 검사 스키마
  postAddUserSchema: Joi.object({
    // 문자, 도메인 2자 이상
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    // 문자. 알파벳,숫자. 2자 이상. 8자 이하
    name: Joi.string()
      .trim()
      .min(2)
      .max(8)
      .regex(/^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/)
      .required(),
    // 문자. 정규식(최소 8자, 최대 20자, 하나 이상의 문자와 하나의 숫자)
    password: Joi.string()
      .trim()
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W)(?=.\S+$).{8,20}$/)
      .required(),
  }),

  // 로그인 유효성 검사 스키마
  postLoginSchema: Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string()
      .trim()
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W)(?=.\S+$).{8,20}$/)
      .required(),
  }),
  // 비밀번호 수정 유효성 검사 스키마
  putUserSchema: Joi.object({
    password: Joi.string()
      .trim()
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W)(?=.\S+$).{8,20}$/)
      .allow(null, ""),
  }),
};
exports.validationSchema = validationSchema;
