const express = require("express");
const authController = require("../controller/authcontroller");
const auth = require("../middleware/auth");
const authRouter = express.Router();

authRouter.post("/register", authController.register);

authRouter.post("/login", authController.login);

// authRouter.post("/logout", authController.logout);
authRouter.get("/me", auth.verifyLogin, authController.me);
module.exports = authRouter;
