const express = require("express");
const userAuthRouter = express.Router();

const { loginRequired } = require("../middlewares/login_required");
const { userAuthController } = require("../controllers/userAuthController");
const { userValidation } = require("../middlewares/validation");

// 회원가입
userAuthRouter.post(
  "/",
  userValidation.ValidatePostAddUser,
  userAuthController.postAddUser
);

// 로그인
userAuthRouter.post(
  "/login",
  userValidation.ValidatePostLogin,
  userAuthController.postLogin
);

// 유저 정보 조회
userAuthRouter.get("/", loginRequired, userAuthController.getUser);

// 유저 작성글 조회
userAuthRouter.get("/post/:userId", userAuthController.getUserPost);

// 이메일 중복 조회
userAuthRouter.get("/email/:email", userAuthController.getCheckEmail);

// 닉네임 중복 조회
userAuthRouter.get("/name/:name", userAuthController.getCheckName);

// 유저 정보 수정, 업데이트
userAuthRouter.put(
  "/:userId",
  userValidation.ValidatePutUser,
  loginRequired,
  userAuthController.putUser
);

// 유저 이미지 기본값으로 변경
userAuthRouter.put(
  "/defaultimage/:userId",
  loginRequired,
  userAuthController.putDefaultImage
);

// 회원 탈퇴
userAuthRouter.delete("/:userId", loginRequired, userAuthController.deleteUser);

exports.userAuthRouter = userAuthRouter;
