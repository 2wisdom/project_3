const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = mongoose.Types;

const TokenSchema = new Schema(
  {
    // 몽고db 고유 아이디 숫자만 string으로 저장
    _id: {
      type: String,
      default: () => String(new Types.ObjectId()),
    },
    refreshToken: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    // 생성, 수정 시간 자동으로 기록
    timestamps: true,
  }
);

// mongoose.model(모델이름, 스키마) // 모델이름s 로 collection 이름이 생성
const TokenModel = mongoose.model("Token", TokenSchema);

exports.TokenModel = TokenModel;
