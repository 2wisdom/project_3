/**
 * 필수 인증 미들웨어
 *
 * 반드시 인증(authentication) 이 필요한 라우터에만
 * 등록해서 사용
 */
function loginRequired(req, res, next) {
  if (!req.currentUserId) {
    res.status(400).send("로그인한 유저만 사용할 수 있는 서비스입니다.");
    return;
  }

  next();
}

exports.loginRequired = loginRequired;
