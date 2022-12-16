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
      if (req.file === undefined) {
        throw new Error("이미지를 첨부해주세요");
      }
      data = { imageUrl: imageUrl };

      let predictResult = null;

      const result = await axios
        .post(serverUrl, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          predictResult = res.data;
        });

      // if (result) {
      //   console.log("result.data", result.data);
      //   await wrapper(deleteUserImage, imageUrl);
      // }

      if (predictResult) {
        console.log("result.data", predictResult);
        await wrapper(deleteUserImage, imageUrl);
      }

      writeLog("info", null, req, "이미지 예측 성공");
      res.status(200).json(predictResult);
      // res.status(200).json(result.data);
    } catch (error) {
      next(error);
    }
  },
};

exports.lensController = lensController;
