const express = require("express");
const axios = require("axios");
const { wrapper } = require("../middlewares/errorHandlingWrapper");

const { deleteUserImage } = require("../middlewares/deleteImage");

const AiPortNumber = "8000";
const serverUrl = "http://localhost:" + AiPortNumber + "/predict";

const lensController = {
  postSendImage: async (req, res, next) => {
    try {
      const imageUrl = req.file?.path ?? null;

      data = { imageUrl: imageUrl };

      const result = await axios.post(serverUrl, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      await wrapper(deleteUserImage, imageUrl);

      writeLog("info", userId, req, "이미지 예측 성공");
      res.status(200).json(result.data);
    } catch (error) {
      return error;
    }
  },
};

exports.lensController = lensController;
