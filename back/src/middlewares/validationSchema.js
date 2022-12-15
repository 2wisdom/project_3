const Joi = require("joi");

const PasswordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W)(?=.\S+$).{8,20}$/;

const email = Joi.string()
  // 문자, 도메인 2자 이상
  .email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  })
  .required();

// 문자. 알파벳,숫자. 2자 이상. 8자 이하
const name = Joi.string()
  .trim()
  .min(2)
  .max(6)
  .regex(/^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,6}$/)
  .required();

// 문자. 정규식(최소 8자, 최대 20자, 하나 이상의 문자와 하나의 숫자)
const password = Joi.string().trim().regex(PasswordPattern).required();

const passwordWithNull = Joi.string()
  .trim()
  .regex(PasswordPattern)
  .allow(null, "");

// 스키마
const validationSchema = {
  // 회원가입 유효성 검사 스키마
  postAddUserSchema: Joi.object({
    email: email,
    name: name,
    password: password,
  }),

  // 로그인 유효성 검사 스키마
  postLoginSchema: Joi.object({
    email: email,
    password: password,
  }),

  // 비밀번호 수정 유효성 검사 스키마
  putUserSchema: Joi.object({
    password: passwordWithNull,
    newPassword: passwordWithNull,
  }),

  // 검색 스키마
  getSearchSchema: Joi.object({
    option: Joi.string()
      .regex(/^(all|contents|title)$/)
      .required(),
    question: Joi.string()
      .regex(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]+$/)
      .required(),
    page: Joi.string()
      .regex(/^[0-9]$/)
      .required(),
  }),

  // 이메일 중복 검사 스키마
  getCheckEmail: Joi.object({
    email: email,
  }),

  // 닉네임 중복 검사 스키마
  getCheckName: Joi.object({
    name: name,
  }),
};
exports.validationSchema = validationSchema;
