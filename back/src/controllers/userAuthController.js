const express = require("express");

const { userAuthService } = require("../services/userAuthService");
const { deleteUserImage } = require("../middlewares/deleteImage");

const userAuthController = {
  //회원가입
  postAddUser: async (req, res, next) => {
    try {
      const { email, password, name } = req.body;
      const imageUrl = 'leafGaeMoYa.png'
      // 서비스 파일에서 addUser 함수 실행
      const userInfo = await userAuthService.addUserInfo({
        email,
        password,
        name,
        imageUrl,
      });

      // 서비스에서 에러가 있다면 에러 통보
      if (userInfo.errorMessage) throw new Error("회원가입 실패");

      // userInfo를 promise로 반환 하여 전달
      res.status(201).json(userInfo);
    } catch (err) {
      next(err);
    }
  },
  // 로그인
  postLogin: async (req, res, next) => {
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
  },
  // 유저 정보 조회
  getUser: async (req, res, next) => {
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
  },
  // 유저 정보 수정
  putUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const password = req.body.password ?? null;
      const imageUrl = req.file?.path ?? null;

      // 변경할 정보를 toUpdate에 초기화
      const toUpdate = { password, imageUrl };

      // 서비스 파일에서 updateUser 함수 실행
      const updatedUser = await userAuthService.updateUserInfo({
        userId,
        toUpdate,
      });

      // 서비스에서 에러가 있다면 에러 통보
      if (updatedUser.errorMessage) throw new Error("회원 정보 불러오기 실패");

      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  },
  // 유저 정보 삭제
  deleteUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const deletedUser = await userAuthService.deleteUserInfo(userId);

      if (!deletedUser.errorMessage && deletedUser.imageUrl) {
        await deleteUserImage(deletedUser.imageUrl);
      }
      if (deletedUser.errorMessage) throw new Error("회원 삭제 실패");

      res.status(200).json(deletedUser);
    } catch (err) {
      next(err);
    }
  },
};

exports.userAuthController = userAuthController;
