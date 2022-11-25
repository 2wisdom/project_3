const express = require("express");
const tokenRouter = express.Router();

const { tokenController } = require("../controllers/tokenController");

tokenRouter.post("/refresh/:userId", tokenController.postRefreshToken);

exports.tokenRouter = tokenRouter;
