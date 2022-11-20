const path = require('path');

const express = require("express");
const cors = require("cors");
const multer = require("multer");

const { errorMiddleware } = require("./middlewares/errorMiddleware");
const { userAuthRouter } = require("./routers/userAuthRouter");
const postRouter = require("./routers/PostRouter");

const app = express();

// multer storage 설정
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 저장 경로
    cb(null, "./images/userImages");
  },
  // 파일 저장 이름
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

// multer fileFilter 설정
const fileFilter = (req, file, cb) => {
  // png, jpg, jpeg 형식의 이미지만 허용
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// multipart/form-data 형태의 데이터 해석
app.use(
  // name이 image인 인풋에서 받아온 이미지 하나를 storage에 저장
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

// cors에러 해결
app.use(cors());
// application/json 형태의 데이터를 해석.
app.use(express.json());
// application/x-www-form-urlencoded 형태의 데이터를 해석
app.use(express.urlencoded({ extended: true }));


// app.use("./images/userImages", express.static(path.join(__dirname, "images/userImages")));


// app.use("/users", (req, res, next) => {console.log(`req 확인: `,req.body)});

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
