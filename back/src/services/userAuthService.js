const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { wrapper } = require("../middlewares/errorHandlingWrapper");
const { User } = require("../db/models/User");
const { Token } = require("../db/models/Token");
const { deleteUserImage } = require("../middlewares/deleteImage");
const Post = require("../db/models/Post");
const Market = require("../db/models/Market");
const Ask = require("../db/models/Ask");
const { Comment } = require("../db/models/Comment");

// .env 에서 암호화 난이도 가져오기
const SALT_ROUND = parseInt(process.env.SALT_ROUND);

const userAuthService = {
  // 회원가입
  addUserInfo: async (newUser) => {
    try {
      // models 에서 데이터 찾기, 없다면 null을 return

      const userEmail = await wrapper(User.findByEmail, newUser.email);

      if (userEmail) throw new Error("중복된 아이디입니다.");

      //비밀번호 암호화
      const hashedPassword = await bcrypt.hash(newUser.password, SALT_ROUND);

      // 암호화된 비밀번호 newUser에 초기화
      newUser.password = hashedPassword;

      // 모델에 유저 데이터 입력
      const createdNewUser = await wrapper(User.create, newUser);
      createdNewUser.errorMessage = null;

      return createdNewUser;
    } catch (error) {
      return error;
    }
  },

  // 이메일 중복 조회
  CheckEmailExist: async (email) => {
    try {
      // 중복되는 이메일이 있으면 데이터, 중복되는 이메일이 없으면 null
      const userEmail = await wrapper(User.findByEmail, email);

      // 이메일이 디비에 없을 경우
      if (!userEmail) {
        const checkedEmail = {};
        checkedEmail.email = undefined;
        checkedEmail.errorMessage = null;
        return checkedEmail;
      }
      // 이메일이 디비에 있을 경우
      userEmail.errorMessage = null;
      return userEmail;
    } catch (error) {
      return error;
    }
  },

  // 닉네임 중복 조회
  CheckNameExist: async (name) => {
    try {
      // 중복되는 닉네임이 있으면 데이터, 중복되는 닉네임이 없으면 null
      const userName = await wrapper(User.findByName, name);

      // 닉네임이 디비에 없을 경우
      if (!userName) {
        const checkedName = {};
        checkedName.name = undefined;
        checkedName.errorMessage = null;
        return checkedName;
      }
      // 닉네임이 디비에 있을 경우
      userName.errorMessage = null;
      return userName;
    } catch (error) {
      return error;
    }
  },

  // 로그인
  login: async (email, password) => {
    try {
      // models 에서 유저 정보 데이터 찾기
      const userInfo = await wrapper(User.findByEmail, email);

      if (!userInfo) throw new Error("이메일이 없습니다.");

      const { userId, name, imageUrl } = userInfo;

      console.log(`로그인 확인1:`, userInfo.password);
      console.log(`로그인 확인2:`, password);
      // 암호화된 비밀번호와 입력된 비밀번호 비교
      const currentPasswordHash = userInfo.password;
      const isPasswordcurrent = await bcrypt.compare(
        password,
        currentPasswordHash
      );

      // 비밀번호 일치하지 않았을 경우 에러 처리
      if (!isPasswordcurrent) throw new Error("비밀번호가 일치하지 않습니다.");

      // .env 에서 jwt 서명 받아옴
      const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";

      // 유저 정보 고유 아이디와 jwt 서명을 사용하여 refresh jwt 토큰 생성
      let refreshToken = jwt.sign({ userId: userId }, secretKey, {
        expiresIn: process.env.REFRESH_EXPIRES_IN,
        issuer: "team12",
      });

      // 유저 정보 고유 아이디와 jwt 서명을 사용하여 access jwt 토큰 생성
      const accessToken = jwt.sign({ userId: userId }, secretKey, {
        // 토큰 유효 기간, 발행자
        expiresIn: process.env.ACCESS_EXPIRES_IN,
        issuer: "team12",
      });

      const isTokenExist = await wrapper(Token.findByUserId, userId);

      if (isTokenExist) {
        const tokenId = isTokenExist.tokenId;
        const fieldToUpdate = {};
        const newValue = {};

        fieldToUpdate.refreshToken = "refreshToken";
        fieldToUpdate.userId = "userId";

        newValue.refreshToken = refreshToken;
        newValue.userId = userId;

        updatedNewTokenInfo = await wrapper(Token.update, {
          tokenId,
          fieldToUpdate,
          newValue,
        });

        let = refreshToken = updatedNewTokenInfo.refreshToken;
      } else if (!isTokenExist) {
        const newToken = {
          refreshToken: refreshToken,
          userId: userInfo.userId,
        };

        const createdNewTokenInfo = await wrapper(Token.create, newToken);
        let = refreshToken = createdNewTokenInfo.refreshToken;
      }

      // 토큰, 고유아이디, 이메일, 이름
      const loginUser = { accessToken, userId, email, name, imageUrl };

      loginUser.errorMessage = null;

      return loginUser;
    } catch (error) {
      return error;
    }
  },

  // 유저 정보 조회(userId)
  getUserInfo: async (userId) => {
    try {
      // models 에서 유저 고유 아이디로 데이터 찾기
      const getUserInfo = await wrapper(User.findById, userId);

      getUserInfo.errorMessage = null;

      return getUserInfo;
    } catch (error) {
      return error;
    }
  },

  // 마이페이지 자랑하기 게시글
  userPosts: async (userId, page) => {
    try {
      const userPosts = await wrapper(Post.findUserAllPosts, userId, page);
      const userPostsCount = await wrapper(Post.findUserAllPostsCount, userId);
      const userPostsResponse = {};

      if (userPosts.length === 0) {
        userPosts.posts = "게시물 없음";
        return userPosts;
      }

      const totalPage = Math.ceil(
        userPostsCount / process.env.PAGE_LIMIT_COUNT
      );

      userPostsResponse.totalPage = totalPage;
      userPostsResponse.userPosts = userPosts;

      userPostsResponse.errorMessage = null;

      return userPostsResponse;
    } catch (error) {
      return error;
    }
  },

  // 마이페이지 마켓 게시글
  userMarkets: async (userId, page) => {
    try {
      const userMarkets = await wrapper(
        Market.findUserAllMarkets,
        userId,
        page
      );
      const userMarketsCount = await wrapper(
        Market.findUserAllMarketsCount,
        userId
      );
      const userMarketsResponse = {};

      if (userMarkets.length === 0) {
        userMarkets.posts = "게시물 없음";
        return userMarkets;
      }

      const totalPage = Math.ceil(
        userMarketsCount / process.env.PAGE_LIMIT_COUNT
      );

      userMarketsResponse.totalPage = totalPage;
      userMarketsResponse.userMarkets = userMarkets;

      userMarketsResponse.errorMessage = null;

      return userMarketsResponse;
    } catch (error) {
      return error;
    }
  },

  // 마이페이지 질문하기 게시글
  userAsks: async (userId, page) => {
    try {
      const userAsks = await wrapper(Ask.findUserAllAsks, userId, page);
      const userAsksCount = await wrapper(Ask.findUserAllAsksCount, userId);
      const userAsksResponse = {};

      if (userAsks.length === 0) {
        userAsks.posts = "게시물 없음";
        return userAsks;
      }

      const totalPage = Math.ceil(userAsksCount / process.env.PAGE_LIMIT_COUNT);

      userAsksResponse.totalPage = totalPage;
      userAsksResponse.userAsks = userAsks;

      userAsksResponse.errorMessage = null;

      return userAsksResponse;
    } catch (error) {
      return error;
    }
  },

  // 마이페이지 코멘트
  userComments: async (userId, page) => {
    try {
      const userComments = await wrapper(
        Comment.findUserAllComments,
        userId,
        page
      );

      // const userIdResult = userComments.map((userComment) => {
      //   return userComment.writingId;
      // });

      // const result = Array.from(new Set(userIdResult));

      // console.log(result);

      const userCommentsCount = await wrapper(
        Comment.findUserAllCommentsCount,
        userId
      );
      const userCommentsResponse = {};

      if (userComments.length === 0) {
        userComments.posts = "게시물 없음";
        return userComments;
      }

      const totalPage = Math.ceil(
        userCommentsCount / process.env.PAGE_LIMIT_COUNT
      );

      userCommentsResponse.totalPage = totalPage;
      userCommentsResponse.userMarkets = userComments;

      userCommentsResponse.errorMessage = null;

      return userCommentsResponse;
    } catch (error) {
      return error;
    }
  },

  // 유저 정보 업데이트
  updateUserInfo: async ({ userId, toUpdate }) => {
    try {
      const userInfo = await wrapper(User.findById, userId);

      const oldPassword = userInfo.password;
      const oldImageUrl = userInfo.imageUrl;

      // 비밀번호와 이미지 업데이트
      if (toUpdate.newPassword && toUpdate.imageUrl) {
        if (oldPassword !== toUpdate.password)
          throw new Error("비밀번호가 일치하지 않습니다.");

        const fieldToUpdate = {};
        const newValue = {};

        fieldToUpdate.password = "password";
        fieldToUpdate.imageUrl = "imageUrl";

        // 입력 받은 비밀번호 암호화
        newValue.password = await bcrypt.hash(toUpdate.newPassword, SALT_ROUND);
        // newValue.password = toUpdate.newPassword;
        newValue.imageUrl = toUpdate.imageUrl;

        // userId 가 일치하는 다큐먼트의 field인 password를 newValue로 업데이트
        const newUserInfo = await wrapper(User.update, {
          userId,
          fieldToUpdate,
          newValue,
        });
        await wrapper(deleteUserImage, oldImageUrl);
        return newUserInfo;
      }

      // 비밀번호만 업데이트
      if (toUpdate.newPassword && !toUpdate.imageUrl) {
        console.log("oldPassword 확인:", oldPassword);
        console.log("toUpdate.password 확인:", toUpdate.password);

        const isPasswordSame = await bcrypt.compare(
          toUpdate.password,
          oldPassword
        );

        console.log(`isPasswordSame확인:`, isPasswordSame);

        if (!isPasswordSame) throw new Error("비밀번호가 일치하지 않습니다.");

        const fieldToUpdate = {};
        const newValue = {};

        fieldToUpdate.password = "password";
        fieldToUpdate.imageUrl = "imageUrl";

        // 입력 받은 비밀번호 암호화
        newValue.password = await bcrypt.hash(toUpdate.newPassword, SALT_ROUND);
        // newValue.password = toUpdate.newPassword;
        newValue.imageUrl = userInfo.imageUrl;

        // userId 가 일치하는 다큐먼트의 field인 password를 newValue로 업데이트
        const newUserInfo = await wrapper(User.update, {
          userId,
          fieldToUpdate,
          newValue,
        });
        if (newUserInfo.imageUrl === process.env.DEFAULT_IMAGE_NAME) {
          newUserInfo.imageUrl = process.env.DEFAULT_IMAGE_URL;
        }
        return newUserInfo;
      }

      // 이미지만 업데이트
      if (toUpdate.imageUrl && !toUpdate.newPassword) {
        const fieldToUpdate = {};
        const newValue = {};

        fieldToUpdate.password = "password";
        fieldToUpdate.imageUrl = "imageUrl";
        // 입력 받은 비밀번호 암호화
        newValue.password = await bcrypt.hash(oldPassword, SALT_ROUND);
        // newValue.password = oldPassword;
        newValue.imageUrl = toUpdate.imageUrl;

        // userId 가 일치하는 다큐먼트의 field인 password를 newValue로 업데이트
        const newUserInfo = await wrapper(User.update, {
          userId,
          fieldToUpdate,
          newValue,
        });

        await wrapper(deleteUserImage, oldImageUrl);
        return newUserInfo;
      }

      return newUserInfo;
    } catch (error) {
      return error;
    }
  },
  // 유저 정보 삭제
  deleteUserInfo: async (userId) => {
    try {
      // models의 delete 함수 실행
      let user = await User.delete(userId);

      user.errorMessage = null;

      return user;
    } catch (error) {
      return error;
    }
  },
};

exports.userAuthService = userAuthService;
