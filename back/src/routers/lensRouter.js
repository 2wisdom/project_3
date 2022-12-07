const express = require("express");
const lensRouter = express.Router();

const { lensController } = require("../controllers/lensController");

lensRouter.post("/", lensController.postSendImage);

exports.lensRouter = lensRouter;
