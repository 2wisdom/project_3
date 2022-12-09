const express = require("express");
const Image = require("../db/schemas/image");
const logger = require("../config/logger");
const os = require("os");

// 이미지 업로드
const imageController = {
  uploadImage: async (req, res) => {
    if (!req.headers["content-type"].startsWith("multipart/form-data")) {
      throw Error({ message: "Content-Type once multipart/form-data" });
    }

    const isWindow = os.platform() === "win32";

    const url = `${req.protocol}://${req.hostname}${
      parseInt(process.env.SERVER_PORT, 10) === 80
        ? ""
        : `:${process.env.SERVER_PORT}`
    }`;

    let path = req.file.path;

    // support window
    if (isWindow) {
      path = path.split("\\").join("/");
    }

    const resolveUrl = `${url}/${path}`;

    try {
      logger.info("이미지 업로드");
      return res.json({
        url: resolveUrl,
      });
    } catch (err) {
      logger.error(err);
      return res.status(400).send("Error");
    }
  },
};

exports.imageController = imageController;
