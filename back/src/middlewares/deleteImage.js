const fs = require("fs");
const path = require("path");

const deleteUserImage = async (imageUrl) => {
  fs.unlink(
    path.join(__dirname,'..', '..', imageUrl),
    (err) => {
      if (err) {
        throw new Error("이미지 삭제 실패");
      }
    }
  );
}

exports.deleteUserImage = deleteUserImage;