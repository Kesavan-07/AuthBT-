const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../utils/config");

const authController = {
  // register
  register: async (request, response) => {
    try {
      const { name, email, password } = request.body;
      // check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return response.status(400).json({ message: "User already exists" });
      }
      // to encrypt the password
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: passwordHash,
      });
      await newUser.save();
      response.json({ message: "User registered successfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  // login
  login: async (request, response) => {
    try {
      const { email, password } = request.body;
      const user = await User.findOne({ email });
      if (!user) {
        return response.status(400).json({ message: "User does not exist" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return response.status(400).json({ message: "Invalid password" });
      }
      const token = await jwt.sign(
        {
          id: user._id,
        },
        SECRET_KEY
      );
      response.json({ token, message: "User logged in successfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  // logout
  logout: (request, response) => {
    // Clear the token or session here if applicable
    response.json({ message: "Logout successfully done" });
  },
  // me
  me: async (request, response) => {
    try {
      const userId = request.userId;
      if (!userId) {
        return response.status(400).json({ message: "User ID not provided" });
      }
      const user = await User.findById(userId).select(
        "-password -createdAt -updatedAt"
      );
      response.json(user);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};

module.exports = authController;
