const express = require("express");

const { tokenService } = require("../services/tokenService");
const { userAuthService } = require("../services/userAuthService");
const { deleteUserImage } = require("../middlewares/deleteImage");

const userAuthController = {
  //회원가입
  postAddUser: async (req, res, next) => {
    try {
      const { email, password, name } = req.body;
      const imageUrl = process.env.DEFAULT_IMAGE_NAME;
      // 서비스 파일에서 addUser 함수 실행
      const userInfo = await userAuthService.addUserInfo({
        email,
        password,
        name,
        imageUrl: process.env.DEFAULT_IMAGE_URL,
      });

      const userInfoWithoutPassword = {
        userId: userInfo.userId,
        email: userInfo.email,
        name: userInfo.name,
        imageUrl: userInfo.imageUrl,
      };

      // 서비스에서 에러가 있다면 에러 통보
      if (userInfo.errorMessage) throw new Error("회원가입 실패");

      // userInfo를 promise로 반환 하여 전달
      res.status(201).json(userInfoWithoutPassword);
    } catch (error) {
      next(error);
    }
  },

  // 이메일 중복 조회
  getCheckEmail: async (req, res, next) => {
    try {
      const { email } = req.params;

      // 중복되는 이메일이 있으면 데이터, 중복되는 이메일이 없으면 undefined
      const isEmailExist = await userAuthService.CheckEmailExist(email);

      // 중복되는 이메일이 있는 경우
      if (isEmailExist.email) {
        if (isEmailExist.errorMessage) throw new Error("유저조회 실패");
        res.status(409).json("duplicated email");
        return;
      }

      // 중복되는 이메일이 없는 경우
      if (!isEmailExist.email) {
        if (isEmailExist.errorMessage) throw new Error("유저조회 실패");
        res.status(200).json("OK");
      }
    } catch (error) {
      next(error);
    }
  },

  // 닉네임 중복 조회
  getCheckName: async (req, res, next) => {
    try {
      const { name } = req.params;

      // 중복되는 닉네임이 있으면 데이터, 중복되는 닉네임이 없으면 undefined
      const isNameExist = await userAuthService.CheckNameExist(name);

      // 중복되는 닉네임이 있는 경우
      if (isNameExist.name) {
        if (isNameExist.errorMessage) throw new Error("유저조회 실패");
        res.status(409).json("duplicated name");
        return;
      }

      // 중복되는 닉네임이 없는 경우
      if (!isNameExist.name) {
        if (isNameExist.errorMessage) throw new Error("유저조회 실패");
        res.status(200).json("OK");
      }
    } catch (error) {
      next(error);
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
    } catch (error) {
      next(error);
    }
  },

  // 유저 정보 조회
  getUser: async (req, res, next) => {
    try {
      const user_Id = req.currentUserId;

      // 서비스 파일에서 getUserInfo 함수 실행
      const currentUserInfo = await userAuthService.getUserInfo(user_Id);
      const { userId, email, name, imageUrl } = currentUserInfo;

      const currentUserInfoWithoutPassword = { userId, email, name, imageUrl };

      // 서비스에서 에러가 있다면 에러 통보
      if (currentUserInfoWithoutPassword.errorMessage)
        throw new Error("회원 정보 불러오기 실패");

      res.status(200).send(currentUserInfoWithoutPassword);
    } catch (error) {
      next(error);
    }
  },

  // 마이페이지 자랑하기 작성글 조회
  getUserPosts: async (req, res, next) => {
    const { userId } = req.query;
    const { page } = req.query;
    try {
      const currentUserPosts = await userAuthService.userPosts(userId, page);

      if (currentUserPosts.errorMessage)
        throw new Error("회원 정보 불러오기 실패");

      if (currentUserPosts.posts) {
        return res.status(200).send([]);
      }

      res.status(200).send(currentUserPosts);
    } catch (error) {
      next(error);
    }
  },

  // 마이페이지 마켓 작성글 조회
  getUserMarkets: async (req, res, next) => {
    const { userId } = req.query;
    const { page } = req.query;
    try {
      const currentUserMarkets = await userAuthService.userMarkets(
        userId,
        page
      );

      if (currentUserMarkets.errorMessage)
        throw new Error("회원 정보 불러오기 실패");

      if (currentUserMarkets.posts) {
        return res.status(200).send([]);
      }

      res.status(200).send(currentUserMarkets);
    } catch (error) {
      next(error);
    }
  },

  // 마이페이지 질문하기 작성글 조회
  getUserAsks: async (req, res, next) => {
    const { userId } = req.query;
    const { page } = req.query;
    try {
      const currentUserAsks = await userAuthService.userAsks(userId, page);

      if (currentUserAsks.errorMessage)
        throw new Error("회원 정보 불러오기 실패");

      if (currentUserAsks.posts) {
        return res.status(200).send([]);
      }

      res.status(200).send(currentUserAsks);
    } catch (error) {
      next(error);
    }
  },

  // 유저 정보 수정
  putUser: async (req, res, next) => {
    const { userId } = req.params;
    const password = req.body.password ?? null;
    const imageUrl = req.file?.path ?? null;

    try {
      // 변경할 정보를 toUpdate에 초기화
      const toUpdate = { password, imageUrl };

      // 서비스 파일에서 updateUser 함수 실행
      const updatedUser = await userAuthService.updateUserInfo({
        userId,
        toUpdate,
      });

      const updatedUserWithoutPassword = {
        userId: updatedUser.userId,
        email: updatedUser.email,
        name: updatedUser.name,
        imageUrl: updatedUser.imageUrl,
      };

      // 서비스에서 에러가 있다면 에러 통보
      if (updatedUser.errorMessage) throw new Error("회원 정보 불러오기 실패");

      res.status(200).json(updatedUserWithoutPassword);
    } catch (error) {
      if (imageUrl) {
        await deleteUserImage(imageUrl);
      }

      next(error);
    }
  },

  // 유저 이미지 기본값으로 변경
  putDefaultImage: async (req, res, next) => {
    const { userId } = req.params;
    try {
      const currentUserInfo = await userAuthService.getUserInfo(userId);

      if (currentUserInfo.imageUrl !== process.env.DEFAULT_IMAGE_URL) {
        const oldImageUrl = currentUserInfo.imageUrl;
        const imageUrl = process.env.DEFAULT_IMAGE_URL;
        const password = null;
        const toUpdate = { password, imageUrl };

        const updatedUser = await userAuthService.updateUserInfo({
          userId,
          toUpdate,
        });
        if (updatedUser.errorMessage)
          throw new Error("회원 정보 불러오기 실패");

        const updatedUserWithoutPassword = {
          userId: updatedUser.userId,
          email: updatedUser.email,
          name: updatedUser.name,
          imageUrl: updatedUser.imageUrl,
        };

        return res.status(200).json(updatedUserWithoutPassword);
      }
      res.status(400).json("이미 기본 이미지입니다");
    } catch (error) {
      next(error);
    }
  },

  // 유저 정보 삭제
  deleteUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const deletedUser = await userAuthService.deleteUserInfo(userId);
      const deletedToken = await tokenService.deleteTokenInfo(userId);
      if (!deletedUser.errorMessage && deletedUser.imageUrl) {
        await deleteUserImage(deletedUser.imageUrl);
      }
      if (deletedUser.errorMessage) throw new Error("회원 정보 삭제 실패");

      res.status(200).json("회원 정보 삭제 성공");
    } catch (error) {
      next(error);
    }
  },
};

exports.userAuthController = userAuthController;
