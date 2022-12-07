const express = require("express");
const axios = require("axios");

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
      // console.log(`렌즈 컨트롤`, result.data);
      await deleteUserImage(imageUrl);
      res.status(200).json(result.data);
    } catch (error) {
      next(error);
    }
  },
};

exports.lensController = lensController;
