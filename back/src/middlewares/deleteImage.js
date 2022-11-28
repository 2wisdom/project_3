const fs = require("fs");
const path = require("path");

const deleteUserImage = async (imageUrl) => {
  if (imageUrl !== "leafGaeMoYa.png") {
    await fs.unlink(path.join(__dirname, "..", "..", imageUrl), (err) => {
      if (err) {
        throw new Error("이미지 삭제 실패");
      }
    });
  } else {
    return null;
  }
};

exports.deleteUserImage = deleteUserImage;
