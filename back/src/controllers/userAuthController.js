const express = require("express");

const { tokenService } = require("../services/tokenService");
const { userAuthService } = require("../services/userAuthService");
const { deleteUserImage } = require("../middlewares/deleteImage");
const { wrapper } = require("../middlewares/errorHandlingWrapper");
const { writeLog } = require("../middlewares/writeLog");
const Ask = require("../db/models/Ask");
const Post = require("../db/models/Post");
const Market = require("../db/models/Market");
const { Comment } = require("../db/models/Comment");

const userAuthController = {
  //회원가입
  postAddUser: async (req, res, next) => {
    const { email, password, name } = req.body;
    const imageUrl = process.env.DEFAULT_IMAGE_NAME;
    try {
      // 서비스 파일에서 addUser 함수 실행
      const userInfo = await wrapper(userAuthService.addUserInfo, {
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

      writeLog("info", email, req, "회원가입 성공");
      // userInfo를 promise로 반환 하여 전달
      res.status(201).json(userInfoWithoutPassword);
    } catch (error) {
      next(error);
    }
  },

  // 이메일 중복 조회
  getCheckEmail: async (req, res, next) => {
    const { email } = req.params;
    console.log(`에러 확인: `, req.params);
    try {
      // 중복되는 이메일이 있으면 데이터, 중복되는 이메일이 없으면 undefined
      const isEmailExist = await wrapper(
        userAuthService.CheckEmailExist,
        email
      );

      // 중복되는 이메일이 있는 경우
      if (isEmailExist.email) {
        if (isEmailExist.errorMessage) throw new Error("유저조회 실패");
        writeLog("info", null, req, "이미 가입된 이메일");
        res.status(409).json("duplicated email");
        return;
      }

      // 중복되는 이메일이 없는 경우
      if (!isEmailExist.email) {
        if (isEmailExist.errorMessage) throw new Error("유저조회 실패");
        writeLog("info", null, req, "사용 가능한 이메일");
        res.status(200).json("OK");
      }
    } catch (error) {
      next(error);
    }
  },

  // 닉네임 중복 조회
  getCheckName: async (req, res, next) => {
    const { name } = req.params;
    try {
      // 중복되는 닉네임이 있으면 데이터, 중복되는 닉네임이 없으면 undefined
      const isNameExist = await wrapper(userAuthService.CheckNameExist, name);

      // 중복되는 닉네임이 있는 경우
      if (isNameExist.name) {
        if (isNameExist.errorMessage) throw new Error("유저조회 실패");
        writeLog("info", null, req, "이미 가입된 닉네임");
        res.status(409).json("duplicated name");
        return;
      }

      // 중복되는 닉네임이 없는 경우
      if (!isNameExist.name) {
        if (isNameExist.errorMessage) throw new Error("유저조회 실패");
        writeLog("info", null, req, "사용 가능한 닉네임");
        res.status(200).json("OK");
      }
    } catch (error) {
      next(error);
    }
  },

  // 로그인
  postLogin: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      // 서비스 파일에서 login 함수 실행
      const userLoginInfo = await wrapper(
        userAuthService.login,
        email,
        password
      );

      // 서비스에서 에러가 있다면 에러 통보
      if (userLoginInfo.errorMessage) throw new Error("로그인 실패");

      writeLog("info", email, req, "로그인 성공");
      res.status(201).send(userLoginInfo);
    } catch (error) {
      next(error);
    }
  },

  // 유저 정보 조회
  getUser: async (req, res, next) => {
    console.log(`확인:`, req);
    const user_Id = req.currentUserId;
    try {
      // 서비스 파일에서 getUserInfo 함수 실행
      const currentUserInfo = await wrapper(
        userAuthService.getUserInfo,
        user_Id
      );
      const { userId, email, name, imageUrl } = currentUserInfo;

      const currentUserInfoWithoutPassword = { userId, email, name, imageUrl };

      // 서비스에서 에러가 있다면 에러 통보
      if (currentUserInfoWithoutPassword.errorMessage)
        throw new Error("회원 정보 불러오기 실패");

      writeLog("info", user_Id, req, "유저 조회 성공");
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
      const currentUserPosts = await wrapper(
        userAuthService.userPosts,
        userId,
        page
      );

      if (currentUserPosts.errorMessage)
        throw new Error("회원 정보 불러오기 실패");

      if (currentUserPosts.posts) {
        return res.status(404).send("게시물 없음");
      }

      writeLog("info", userId, req, "자랑하기 작성글 조회 성공");
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
      const currentUserMarkets = await wrapper(
        userAuthService.userMarkets,
        userId,
        page
      );

      if (currentUserMarkets.errorMessage)
        throw new Error("회원 정보 불러오기 실패");

      if (currentUserMarkets.posts) {
        return res.status(404).send("게시물 없음");
      }

      writeLog("info", userId, req, "마켓 작성글 조회 성공");
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
      const currentUserAsks = await wrapper(
        userAuthService.userAsks,
        userId,
        page
      );

      if (currentUserAsks.errorMessage)
        throw new Error("회원 정보 불러오기 실패");

      if (currentUserAsks.posts) {
        return res.status(404).send("게시물 없음");
      }

      writeLog("info", userId, req, "질문하기 작성글 조회 성공");
      res.status(200).send(currentUserAsks);
    } catch (error) {
      next(error);
    }
  },

  // 마이페이지 작성 코멘트 조회
  getUserComments: async (req, res, next) => {
    const { userId } = req.query;
    const { page } = req.query;
    const { type } = req.query;
    try {
      const currentUserComments = await wrapper(
        userAuthService.userComments,
        userId,
        page,
        type
      );

      if (currentUserComments.errorMessage)
        throw new Error("회원 정보 불러오기 실패");

      if (currentUserComments.posts) {
        return res.status(404).send("게시물 없음");
      }

      writeLog("info", userId, req, "작성 코멘트 조회 성공");
      res.status(200).send(currentUserComments);
    } catch (error) {
      next(error);
    }
  },

  // 유저 정보 수정
  putUser: async (req, res, next) => {
    const { userId } = req.params;

    const newPassword = req.body.newPassword ?? null;
    const password = req.body.password ?? null;
    const imageUrl = req.file?.path ?? null;

    try {
      // 변경할 정보를 toUpdate에 초기화
      const toUpdate = { newPassword, imageUrl, password };

      // 서비스 파일에서 updateUser 함수 실행
      const updatedUser = await wrapper(userAuthService.updateUserInfo, {
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

      writeLog("info", userId, req, "유저 정보 수정 성공");
      res.status(200).json(updatedUserWithoutPassword);
    } catch (error) {
      console.log(error);
      if (imageUrl) {
        await wrapper(deleteUserImage, imageUrl);
      }

      next(error);
    }
  },

  // 유저 이미지 기본값으로 변경
  putDefaultImage: async (req, res, next) => {
    const { userId } = req.params;
    try {
      const currentUserInfo = await wrapper(
        userAuthService.getUserInfo,
        userId
      );

      if (currentUserInfo.imageUrl !== process.env.DEFAULT_IMAGE_URL) {
        const oldImageUrl = currentUserInfo.imageUrl;
        const imageUrl = process.env.DEFAULT_IMAGE_URL;
        const password = null;
        const toUpdate = { password, imageUrl };

        const updatedUser = await wrapper(userAuthService.updateUserInfo, {
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

        writeLog("info", userId, req, "기본 이미지로 변경 성공");
        return res.status(200).json(updatedUserWithoutPassword);
      }
      res.status(400).json("이미 기본 이미지입니다");
    } catch (error) {
      next(error);
    }
  },

  // 유저 정보 삭제
  deleteUser: async (req, res, next) => {
    const { userId } = req.params;
    console.log(`컨트롤러 확인:`, req.params);
    try {
      const deletedUser = await wrapper(userAuthService.deleteUserInfo, userId);

      const deletedToken = await wrapper(tokenService.deleteTokenInfo, userId);
      const deletedAsk = await wrapper(Market.deleteByAuthor, userId);
      const deletedMarket = await wrapper(Post.deleteByAuthor, userId);
      const deletedPost = await wrapper(Ask.deleteByAuthor, userId);
      const deletedComment = await wrapper(Comment.deleteByAuthor, userId);

      if (!deletedUser.errorMessage && deletedUser.imageUrl) {
        await wrapper(deleteUserImage, deletedUser.imageUrl);
      }
      if (deletedUser.errorMessage) throw new Error("회원 정보 삭제 실패");

      writeLog("info", userId, req, "유저 정보 삭제 성공");
      res.status(200).json("회원 정보 삭제 성공");
    } catch (error) {
      next(error);
    }
  },
};

exports.userAuthController = userAuthController;
