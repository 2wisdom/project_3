const multer = require("multer");
const path = require("path");

const UPLOAD_BASE_PATH = path.join(__dirname, "../.."); // C://.../projects/...
const IMAGE_UPLOAD_PATH = "./public/images";

// 이미지 처리
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 저장 경로
    cb(null, IMAGE_UPLOAD_PATH);
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
exports.IMAGE_UPLOAD_PATH = IMAGE_UPLOAD_PATH;
exports.UPLOAD_BASE_PATH = UPLOAD_BASE_PATH;
