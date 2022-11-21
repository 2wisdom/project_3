const express = require("express");
const userAuthRouter = express.Router();

const { loginRequired } = require("../middlewares/login_required");
const { userAuthController } = require("../controllers/userAuthController");

// 회원가입
userAuthRouter.post("/", userAuthController.postAddUser);

// 로그인
userAuthRouter.post("/login", userAuthController.postLogin);

// 유저 정보 조회
userAuthRouter.get("/:userId", userAuthController.getUser);

// 유저 정보 수정, 업데이트
userAuthRouter.put("/:userId", userAuthController.putUser);

// 회원 탈퇴
userAuthRouter.delete("/:userId", userAuthController.deleteUser);

exports.userAuthRouter = userAuthRouter;
