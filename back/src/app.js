const express = require("express");
const cors = require("cors");
const multer  = require('multer')

const { errorMiddleware } = require("./middlewares/errorMiddleware");
const { userAuthRouter } = require("./routers/userAuthRouter");
const postRouter = require("./routers/PostRouter");

const upload = multer({ dest: 'uploads/' })
const app = express();

app.use(cors());
// application/json 형태의 데이터를 해석.
app.use(express.json());
// application/x-www-form-urlencoded 형태의 데이터를 해석
app.use(express.urlencoded({ extended: true }));

// 라우팅
app.use("/users", userAuthRouter);
app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("페이지에 접속 하셨습니다.");
});

// 오류 처리 미들웨어 정의
app.use(errorMiddleware);

// app.get("*", (req, res) => {
//   res.send("죄송합니다. 유효하지 않은 요청입니다.");
// });

exports.app = app;
