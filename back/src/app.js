const path = require("path");
const fs = require("fs");

const express = require("express");
const cors = require("cors");
const multer = require("multer");

const { errorMiddleware } = require("./middlewares/errorMiddleware");
const { userAuthRouter } = require("./routers/userAuthRouter");
const { tokenRouter } = require("./routers/tokenRouter");
const { searchRouter } = require("./routers/searchRouter");
const postRouter = require("./routers/postRouter");
const askRouter = require("./routers/askRouter");
const marketRouter = require("./routers/marketRouter");
const imageRouter = require("./routers/imageRouter");
const commentRouter = require("./routers/commentRouter");
const { fileStorage, fileFilter } = require("./middlewares/uploadFile");

const app = express();

// multipart/form-data 형태의 데이터 해석
app.use(
  // name이 image인 인풋에서 받아온 이미지 하나를 storage에 저장
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
    // 5242880 byte 제한 약 5 mb
    limits: { fileSize: 5 * 1024 * 1024 },
  }).single("image")
);

// cors에러 해결
app.use(cors());
// application/json 형태의 데이터를 해석.
app.use(express.json());
// application/x-www-form-urlencoded 형태의 데이터를 해석
app.use(express.urlencoded({ extended: true }));

// 정적 파일 제공
app.use("/public", express.static(path.join(__dirname, "..", "public")));

// 라우팅
app.use("/users", userAuthRouter);
app.use("/posts", postRouter);
app.use("/asks", askRouter);
app.use("/markets", marketRouter);
app.use("/images", imageRouter);
app.use("/comments", commentRouter);
app.use("/token", tokenRouter);
app.use("/search", searchRouter);

app.get("/", (req, res) => {
  res.send("페이지에 접속 하셨습니다.");
});

// 오류 처리 미들웨어 정의
app.use(errorMiddleware);

// app.get("*", (req, res) => {
//   res.send("죄송합니다. 유효하지 않은 요청입니다.");
// });

exports.app = app;
