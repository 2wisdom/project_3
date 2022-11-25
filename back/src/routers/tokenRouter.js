const express = require("express");
const tokenRouter = express.Router();
const jwt = require("jsonwebtoken");

const { Token } = require("../db/models/Token");

tokenRouter.post("/refresh/:userId", async (req, res) => {
  const { userId } = req.params;
  const { refreshToken } = req.body;

  if (refreshToken === "null") {
    console.log("서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음");
    res.status(401).send("로그인한 유저만 사용할 수 있는 서비스입니다.");
    return;
  }
  // 해당 token 이 정상적인 token인지 확인 -> 토큰에 담긴 user_id 정보 추출
  try {
    const getTokenInfo = await Token.findById(userId);

    if (refreshToken === getTokenInfo.refreshToken) {
      // .env 에서 jwt 서명 받아옴
      const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";

      // 유저 정보 고유 아이디와 jwt 서명을 사용하여 refresh jwt 토큰 생성
      const changedRefreshToken = jwt.sign(
        { userId: getTokenInfo.userId },
        secretKey,
        {
          expiresIn: "7d",
          issuer: "team12",
        }
      );

      // 유저 정보 고유 아이디와 jwt 서명을 사용하여 access jwt 토큰 생성
      const changedAccessToken = jwt.sign(
        { userId: getTokenInfo.userId },
        secretKey,
        {
          // 토큰 유효 기간, 발행자
          expiresIn: "3s",
          issuer: "team12",
        }
      );

      console.log(`토큰 확인`, changedRefreshToken);
      console.log(`토큰 확인`, changedAccessToken);

      const newToken = {
        refreshToken: changedRefreshToken,
        userId: getTokenInfo.userId,
      };

      const fieldToUpdate = {};
      const newValue = {};

      const createdNewTokenInfo = await Token.update(getTokenInfo.userId, newToken);
      let = refreshToken = createdNewTokenInfo.refreshToken;

      const { userId } = getRefreshToken;

      // 토큰, 고유아이디, 이메일, 이름
      const loginUser = { changedRefreshToken, changedAccessToken, userId };

      loginUser.errorMessage = null;

      return loginUser;
    }
  } catch (error) {
    console.log(error.name === "TokenExpiredError");
    if (error.name === "TokenExpiredError") {
      res.status(403).send("토큰이 만료 되었습니다.");
      return;
    }
    console.log(error);
    res.status(400).send("정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.");
    return;
  }
});

exports.tokenRouter = tokenRouter;
