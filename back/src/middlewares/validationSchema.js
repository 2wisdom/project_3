const Joi = require("joi");

const email = Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  })
  .required();

const name = Joi.string()
  .trim()
  .min(2)
  .max(8)
  .regex(/^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,8}$/)
  .required();

const password = Joi.string()
  .trim()
  .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W)(?=.\S+$).{8,20}$/)
  .required();

const validationSchema = {
  // 회원가입 유효성 검사 스키마
  postAddUserSchema: Joi.object({
    // 문자, 도메인 2자 이상
    email: email,
    // 문자. 알파벳,숫자. 2자 이상. 8자 이하
    name: name,
    // 문자. 정규식(최소 8자, 최대 20자, 하나 이상의 문자와 하나의 숫자)
    password: password,
  }),

  // 로그인 유효성 검사 스키마
  postLoginSchema: Joi.object({
    email: email,
    password: password,
  }),
  // 비밀번호 수정 유효성 검사 스키마
  putUserSchema: Joi.object({
    password: password,
  }),
};
exports.validationSchema = validationSchema;
