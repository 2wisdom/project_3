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

// 유저 자랑하기 작성글 조회
userAuthRouter.get("/posts?:userId?:page", userAuthController.getUserPosts);

// 유저 마켓 작성글 조회
userAuthRouter.get("/markets?:userId?:page", userAuthController.getUserMarkets);

// 유저 질문하기 작성글 조회
userAuthRouter.get("/asks?:userId?:page", userAuthController.getUserAsks);

// 유저 작성 코멘트 조회
userAuthRouter.get(
  "/comments?:userId?:page",
  userAuthController.getUserComments
);

// 이메일 중복 조회
userAuthRouter.get("/email/:email", userAuthController.getCheckEmail);

// 닉네임 중복 조회
userAuthRouter.get("/name/:name", userAuthController.getCheckName);

// 유저 정보 수정, 업데이트
userAuthRouter.put("/:userId", loginRequired, userAuthController.putUser);

// 유저 이미지 기본값으로 변경
userAuthRouter.put(
  "/defaultimage/:userId",
  loginRequired,
  userAuthController.putDefaultImage
);

// 회원 탈퇴
userAuthRouter.delete("/:userId", loginRequired, userAuthController.deleteUser);

exports.userAuthRouter = userAuthRouter;
