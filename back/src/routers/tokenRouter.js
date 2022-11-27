const express = require("express");
const tokenRouter = express.Router();

const { loginRequired } = require("../middlewares/login_required");
const { tokenController } = require("../controllers/tokenController");
const { user_Validation } = require("../middlewares/validation");

// access token 재발급
tokenRouter.get("/", tokenController.postReissueToken);

tokenRouter.delete("/", tokenController.deleteLogout);

exports.tokenRouter = tokenRouter;