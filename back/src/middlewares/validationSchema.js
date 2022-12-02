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
    name: Joi.string().alphanum().min(2).max(8).required(),
    // 문자. 정규식(최소 8 자, 하나 이상의 문자와 하나의 숫자)
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{8,10}$"))
      .required(),
    // .regex()
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
      .pattern(new RegExp("^[a-zA-Z0-9]{8,10}$"))
      .required(),
  }),
  // 비밀번호 수정 유효성 검사 스키마
  putUserSchema: Joi.object({
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,10}$")),
    // .allow(null, ""),
  }),
};
// allow
exports.validationSchema = validationSchema;
