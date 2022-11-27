const express = require("express");
const tokenRouter = express.Router();

const { loginRequired } = require("../middlewares/login_required");
const { tokenController } = require("../controllers/tokenController");
const { user_Validation } = require("../middlewares/validation");

// access token 재발급
tokenRouter.post("/", tokenController.postReissueToken);

exports.tokenRouter = tokenRouter;