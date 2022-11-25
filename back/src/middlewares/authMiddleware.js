const jwt = require("jsonwebtoken");

/**
 * 전역 인증 미들웨어
 *
 * 로그인이 성공되면,
 * req.currentUserId 에 호출 한 userId 가 등록된다
 */
function authMiddleware(req, res, next) {
  const userToken = req.headers["authorization"]?.split(" ")[1] ?? null;
  if (!userToken) {
    return next();
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
    res.status(400).send("정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.");
    return;
  }
}

exports.authMiddleware = authMiddleware;
