function errorMiddleware(error, req, res, next) {
  // ANSI escape code를 사용하여 에러를 노란색으로 출력

  let err = error;
  if (typeof err !== "string") {
    err = JSON.stringify(err);
  }
  console.log("\x1b[33m%s\x1b[0m", err);
  res.status(400).json(JSON.parse(error));
}

exports.errorMiddleware = errorMiddleware;
