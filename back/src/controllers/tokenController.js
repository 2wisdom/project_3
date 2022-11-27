const express = require("express");

const { tokenService } = require("../services/userAuthService");
const { Token } = require("../db/models/Token");

const tokenController = {
  // 엑세스 토큰 재발급
  postReissueToken: async (req, res, next) => {
    const userAccessToken =
      req.headers["authorization"]?.split(" ")[1] ?? "null";

    console.log(`토큰 컨트롤러 확인1: `, userAccessToken);

    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";

    console.log(`토큰 컨트롤러 확인2: `, secretKey);

    // 엑세스 토큰을 안보냈을 경우
    if (userAccessToken === "null") {
      console.log(
        "서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음"
      );
      res.status(400).send("로그인한 유저만 사용할 수 있는 서비스입니다.");
      return;
    }

    // 엑세스 토큰을 보냈을 경우
    try {
      console.log(`토큰 컨트롤러 확인3: `, userAccessToken);
      const decodedAccessToken = jwt.decode(userAccessToken, secretKey);
      console.log(`토큰 컨트롤러 확인4: `, decodedAccessToken);
      const accessTokenUserId = decodedAccessToken.userId;

      const tokenInfo = Token.findByUserId(accessTokenUserId);
      if (tokenInfo) {
        const refreshToken = tokenInfo.refreshToken;
        const refreshTokenUserId = jwt.verify(refreshToken, secretKey);
        console.log(`토큰 컨트롤러 확인10: `, refreshTokenUserId);
      }
    } catch (error) {}
  },
};

exports.tokenController = tokenController;
