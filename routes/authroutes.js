const express = require("express");
const authController = require("../controller/authController");
const auth = require("../middleware/auth");

const authRouter = express.Router();

// Register Route
authRouter.post("/register", authController.register);

// Login Route
authRouter.post("/login", authController.login);

// Protected Route: Get User Info
authRouter.get("/me", auth.verifyLogin, authController.me);

module.exports = authRouter;