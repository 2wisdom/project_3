function errorMiddleware(error, req, res, next) {
  // ANSI escape code를 사용하여 에러를 노란색으로 출력
  console.log("\x1b[33m%s\x1b[0m", error);
  res.status(400).send(error.message);
}

exports.errorMiddleware = errorMiddleware;
