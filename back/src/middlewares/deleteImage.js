const fs = require("fs");
const path = require("path");

const deleteUserImage = async (imageUrl) => {
  try {
    if (imageUrl !== process.env.DEFAULT_IMAGE_URL) {
      fs.unlink(path.join(__dirname, "..", "..", imageUrl), (err) => {
        throw new Error("이미지 삭제 실패");
      });
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
};

exports.deleteUserImage = deleteUserImage;
