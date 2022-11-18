const express = require("express");
const userAuthRouter = express.Router();

const { loginRequired } = require("../middlewares/login_required");
const { userAuthService } = require("../services/userAuthService");

// 회원가입
userAuthRouter.post("/", async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    // 서비스 파일에서 addUser 함수 실행
    const userInfo = await userAuthService.addUser({
      email,
      password,
      name,
    });

    // 서비스에서 에러가 있다면 에러 통보
    if (userInfo.errorMessage) throw new Error("회원가입 실패");

    // userInfo를 promise로 반환 하여 전달
    res.status(201).json(userInfo);
  } catch (err) {
    next(err);
  }
});

// 로그인
userAuthRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 서비스 파일에서 login 함수 실행
    const userLoginInfo = await userAuthService.login(email, password);

    // 서비스에서 에러가 있다면 에러 통보
    if (userLoginInfo.errorMessage) throw new Error("로그인 실패");

    res.status(201).send(userLoginInfo);
  } catch (err) {
    next(err);
  }
});

// 유저 정보 조회
userAuthRouter.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;

    // 서비스 파일에서 getUserInfo 함수 실행
    const currentUserInfo = await userAuthService.getUserInfo(userId);

    // 서비스에서 에러가 있다면 에러 통보
    if (currentUserInfo.errorMessage)
      throw new Error("회원 정보 불러오기 실패");

    res.status(200).send(currentUserInfo);
  } catch (err) {
    next(err);
  }
});

// 유저 정보 업데이트
userAuthRouter.patch("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const password = req.body.password ?? null;

    // 변경할 정보를 toUpdate에 초기화
    const toUpdate = { password };

    // 서비스 파일에서 updateUser 함수 실행
    const updatedUser = await userAuthService.updateUser({ userId, toUpdate });

    // 서비스에서 에러가 있다면 에러 통보
    if (updatedUser.errorMessage) throw new Error("회원 정보 불러오기 실패");

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

// 회원 탈퇴
userAuthRouter.delete("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const deletedUser = await userAuthService.deleteUser(userId);

    if (deletedUser.errorMessage) throw new Error("회원 삭제 실패");

    res.status(200).json(deletedUser);
  } catch (err) {
    next(err);
  }
});

exports.userAuthRouter = userAuthRouter;
