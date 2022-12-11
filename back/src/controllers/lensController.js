const axios = require("axios");
const { wrapper } = require("../middlewares/errorHandlingWrapper");
const { writeLog } = require("../middlewares/writeLog");

const { deleteUserImage } = require("../middlewares/deleteImage");

const AiPortNumber = process.env.AI_SERVER_PORT;
const serverUrl = "http://localhost:" + AiPortNumber + "/predict";

const lensController = {
  postSendImage: async (req, res, next) => {
    const imageUrl = req.file?.path ?? null;
    try {
      data = { imageUrl: imageUrl };

      const result = await axios.post(serverUrl, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (result) {
        await wrapper(deleteUserImage, imageUrl);
      }

      writeLog("info", imageUrl, req, "이미지 예측 성공");

      res.status(200).json(result.data);
    } catch (error) {
      return error;
    }
  },
};

exports.lensController = lensController;
