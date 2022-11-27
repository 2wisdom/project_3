const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../db/models/User");
const { Token } = require("../db/models/Token");
const { deleteUserImage } = require("../middlewares/deleteImage");

const SALT_ROUND = parseInt(process.env.SALT_ROUND);

const userAuthService = {
  // 회원가입
  addUserInfo: async (newUser) => {
    // .env 에서 암호화 난이도 가져오기

    // models 에서 데이터 찾기, 없다면 null을 return
    const userEmail = await User.findByEmail(newUser.email);

    if (userEmail) throw new Error("중복된 아이디입니다.");
    //질문 트라이 캐치? 에러? 중복된 아이디가 안나옴

    // 비밀번호 암호화
    // const hashedPassword = await bcrypt.hash(newUser.password, SALT_ROUND);

    // // 암호화된 비밀번호 newUser에 초기화
    // newUser.password = hashedPassword;

    // 모델에 유저 데이터 입력
    const createdNewUser = await User.create(newUser);
    createdNewUser.errorMessage = null;

    return createdNewUser;
  },

  // 이메일 중복 조회
  CheckEmailExist: async (email) => {
    // 중복되는 이메일이 있으면 데이터, 중복되는 이메일이 없으면 null
    const userEmail = await User.findByEmail(email);

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
  },

  // 닉네임 중복 조회
  CheckNameExist: async (name) => {
    // 중복되는 닉네임이 있으면 데이터, 중복되는 닉네임이 없으면 null
    const userName = await User.findByName(name);

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
  },

  // 로그인
  login: async (email, password) => {
    // models 에서 유저 정보 데이터 찾기
    const userInfo = await User.findByEmail(email);

    const { userId, name } = userInfo;

    if (!userInfo) throw new Error("이메일이 없습니다.");

    // // 암호화된 비밀번호와 입력된 비밀번호 비교
    // const currentPasswordHash = userInfo.password;
    // const isPasswordcurrent = await bcrypt.compare(
    //   password,
    //   currentPasswordHash
    // );

    // 비밀번호 일치하지 않았을 경우 에러 처리
    // if (!isPasswordcurrent) throw new Error("비밀번호가 일치하지 않습니다.");

    // .env 에서 jwt 서명 받아옴
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";

    // 유저 정보 고유 아이디와 jwt 서명을 사용하여 refresh jwt 토큰 생성
    let refreshToken = jwt.sign({ userId: userId }, secretKey, {
      expiresIn: "1d",
      issuer: "team12",
    });

    // 유저 정보 고유 아이디와 jwt 서명을 사용하여 access jwt 토큰 생성
    const accessToken = jwt.sign({ userId: userId }, secretKey, {
      // 토큰 유효 기간, 발행자
      expiresIn: "30m",
      issuer: "team12",
    });

    const isTokenExist = await Token.findByUserId(userId);


    if (isTokenExist) {

      const tokenId = isTokenExist.tokenId;
      const fieldToUpdate = {};
      const newValue = {};

      fieldToUpdate.refreshToken = "refreshToken";
      fieldToUpdate.userId = "userId";

      newValue.refreshToken = refreshToken;
      newValue.userId = userId;

      updatedNewTokenInfo = await Token.update({
        tokenId,
        fieldToUpdate,
        newValue,
      });

      let = refreshToken = updatedNewTokenInfo.refreshToken;
    } else if (!isTokenExist) {
      const newToken = { refreshToken: refreshToken, userId: userInfo.userId };

      const createdNewTokenInfo = await Token.create(newToken);
      let = refreshToken = createdNewTokenInfo.refreshToken;
    }

    // 토큰, 고유아이디, 이메일, 이름
    const loginUser = { accessToken, userId, email, name };

    loginUser.errorMessage = null;

    return loginUser;
  },

  getUserInfo: async (userId) => {
    // models 에서 유저 고유 아이디로 데이터 찾기
    const getUserInfo = await User.findById(userId);

    getUserInfo.errorMessage = null;

    return getUserInfo;
  },

  // 유저 정보 업데이트
  updateUserInfo: async ({ userId, toUpdate }) => {
    let user = await User.findById({ userId });

    const oldImageUrl = user.imageUrl;

    // 비밀번호와 이미지 업데이트
    if (toUpdate.password && toUpdate.imageUrl) {
      const fieldToUpdate = {};
      const newValue = {};

      fieldToUpdate.password = "password";
      fieldToUpdate.imageUrl = "imageUrl";
      // 입력 받은 비밀번호 암호화
      // newValue.password = await bcrypt.hash(toUpdate.password, SALT_ROUND);
      newValue.password = toupdate.password;
      newValue.imageUrl = toUpdate.imageUrl;

      // userId 가 일치하는 다큐먼트의 field인 password를 newValue로 업데이트
      user = await User.update({ userId, fieldToUpdate, newValue });
      await deleteUserImage(oldImageUrl);
    }

    // 비밀번호만 업데이트
    if (toUpdate.password && !toUpdate.imageUrl) {
      const fieldToUpdate = {};
      const newValue = {};

      fieldToUpdate.password = "password";
      fieldToUpdate.imageUrl = "imageUrl";
      // 입력 받은 비밀번호 암호화
      // newValue.password = await bcrypt.hash(toUpdate.password, SALT_ROUND);
      newValue.password = toupdate.password;
      newValue.imageUrl = user.imageUrl;

      // userId 가 일치하는 다큐먼트의 field인 password를 newValue로 업데이트
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    // 이미지만 업데이트
    if (toUpdate.imageUrl && !toUpdate.password) {
      const fieldToUpdate = {};
      const newValue = {};

      fieldToUpdate.password = "password";
      fieldToUpdate.imageUrl = "imageUrl";
      // 입력 받은 비밀번호 암호화
      // newValue.password = await bcrypt.hash(user.password, SALT_ROUND);
      newValue.password = toupdate.password;
      newValue.imageUrl = toUpdate.imageUrl;

      // userId 가 일치하는 다큐먼트의 field인 password를 newValue로 업데이트
      user = await User.update({ userId, fieldToUpdate, newValue });
      await deleteUserImage(oldImageUrl);
    }

    return user;
  },

  deleteUserInfo: async (userId) => {
    // models의 delete 함수 실행
    let user = await User.delete(userId);

    user.errorMessage = null;

    return user;
  },
};

exports.userAuthService = userAuthService;
