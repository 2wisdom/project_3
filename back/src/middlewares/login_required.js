const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const { Token } = require("../db/models/Token");
const { User } = require("../db/models/User");

async function loginRequired(req, res, next) {
  const { email } = req.body;

  // request 헤더로부터 authorization bearer 토큰을 받음. authorization: 'Bearer 토큰'
  const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

  // 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열임. 토큰이 "null" 일 경우, login_required 가 필요한 서비스 사용을 제한함.
  if (userToken === "null") {
    console.log("서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음");
    res.status(400).send("로그인한 유저만 사용할 수 있는 서비스입니다.");
    return;
  }
  const userInfo = await User.findByEmail(email);
  const userId = userInfo.userId;

  // 리프레쉬 토큰 디비에서 가져오기
  const getRefreshTokenInfo = await Token.findById(userId);

  if (getRefreshTokenInfo.refreshToken === userToken) {
    try {
      const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";

      // 토큰을 서명으로 확인, 디코딩
      const jwtDecoded = jwt.verify(userToken, secretKey);

      // 유저 정보 고유 아이디와 jwt 서명을 사용하여 access jwt 토큰 생성
      const newAccessToken = jwt.sign({ userId: userId }, secretKey, {
        // 토큰 유효 기간, 발행자
        expiresIn: "1d",
        issuer: "team12",
      });
      const accessToken = { accessToken: newAccessToken, userId: userId };

      res.status(201).send(accessToken);
      return;
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(403).send("refresh token expired");
        return;
      }
      res
        .status(400)
        .send("정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.");
      return;
    }
  }

  // 해당 token 이 정상적인 token인지 확인 -> 토큰에 담긴 user_id 정보 추출
  try {
    // .env 에서 jwt 서명 가져오기
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";

    // 토큰을 서명으로 확인, 디코딩
    const jwtDecoded = jwt.verify(userToken, secretKey);

    const user_id = jwtDecoded.userId;
    req.currentUserId = user_id;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(403).send("access token expired");
      return;
    }
    res.status(400).send("정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.");
    return;
  }
}

exports.loginRequired = loginRequired;
