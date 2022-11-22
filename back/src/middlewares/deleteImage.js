const fs = require("fs");

const deleteUserImage = async (imageUrl) => {
  fs.unlink(
    `/Volumes/projets/elice/projects/third-project-team12/team12/back/${imageUrl}`,
    (err) => {
      if (err) {
        throw new Error("이미지 삭제 실패");
      }
    }
  );
}

exports.deleteUserImage = deleteUserImage;