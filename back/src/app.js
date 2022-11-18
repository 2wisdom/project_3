const express = require("express");
const cors = require("cors");

const { errorMiddleware } = require("./middlewares/errorMiddleware");
const { userAuthRouter } = require("./routers/userAuthRouter");
const postRouter = require("./routers/PostRouter");

const app = express();

app.use(cors());
// application/json 형태의 데이터를 해석.
app.use(express.json());
// application/x-www-form-urlencoded 형태의 데이터를 해석
app.use(express.urlencoded({ extended: true }));

// 라우팅
app.use("/users", userAuthRouter);
app.use(postRouter);

app.get("/", (req, res) => {
  res.send("페이지에 접속 하셨습니다.");
});

// app.get("*", (req, res) => {
//   res.send("죄송합니다. 유효하지 않은 요청입니다.");
// });

// 오류 처리 미들웨어 정의
app.use(errorMiddleware);

exports.app = app;
