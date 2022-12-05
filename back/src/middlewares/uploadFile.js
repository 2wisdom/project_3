const multer = require("multer");

// 이미지 처리
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 저장 경로
    cb(null, "./public/images");
  },
  // 파일 저장 이름
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname.replace(/ /g, ""));
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

exports.fileStorage = fileStorage;
exports.fileFilter = fileFilter;
