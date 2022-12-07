const express = require("express");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

const { tokenService } = require("../services/tokenService");
const { Token } = require("../db/models/Token");
const { wrapper } = require("../middlewares/errorHandlingWrapper");
const { writeLog } = require("../middlewares/writeLog");

const tokenController = {
  // 엑세스 토큰 재발급
  getReissueToken: async (req, res, next) => {
    const userAccessToken =
      req.headers["authorization"]?.split(" ")[1] ?? "null";

    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";

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
      const decodedAccessToken = jwt_decode(userAccessToken, secretKey);

      const accessTokenUserId = decodedAccessToken.userId;

      const tokenInfo = await wrapper(Token.findByUserId, accessTokenUserId);

      const refreshToken = tokenInfo.refreshToken;
      const refreshTokenInfo = jwt.verify(refreshToken, secretKey);
      const refreshTokenUserId = refreshTokenInfo.userId;

      // 엑세스 토큰 재발급
      if (refreshTokenUserId === accessTokenUserId) {
        const accessToken = jwt.sign(
          { userId: refreshTokenUserId },
          secretKey,
          {
            // 토큰 유효 기간, 발행자
            expiresIn: process.env.ACCESS_EXPIRES_IN,
            issuer: "team12",
          }
        );

        const newAccessToken = { accessToken: accessToken };

        writeLog("info", userId, req, "토큰 재발급 성공");
        res.status(201).send(newAccessToken);
        return newAccessToken;
      }
    } catch (error) {
      // 리프레쉬 토큰 만료
      if (error.name === "TokenExpiredError") {
        res.status(403).send("refresh token이 만료 되었습니다.");
        return;
      }
      res
        .status(400)
        .send("정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.");
      return;
    }
  },

  deleteLogout: async (req, res, next) => {
    const userAccessToken =
      req.headers["authorization"]?.split(" ")[1] ?? "null";

    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    // 엑세스 토큰을 안보냈을 경우
    if (userAccessToken === "null") {
      console.log(
        "서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음"
      );
      res.status(400).send("로그인한 유저만 사용할 수 있는 서비스입니다.");
      return;
    }
    try {
      const decodedAccessToken = jwt_decode(userAccessToken, secretKey);
      const accessTokenUserId = decodedAccessToken.userId;
      const deletedToken = await wrapper(
        tokenService.deleteTokenInfo,
        accessTokenUserId
      );

      writeLog("info", userId, req, "토큰 삭제 성공");
      res.status(200).json(deletedToken);
    } catch (error) {
      next(error);
    }
  },
};

exports.tokenController = tokenController;
