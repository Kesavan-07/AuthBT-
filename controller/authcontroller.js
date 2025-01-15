const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../utils/config");
const authController = {
  // register
  register: async (request, response) => {
    try {
      const { name, email, password } = request.body;
      // check if the user already exist
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return response.status(400).json({ message: "user already exist" });
      }
      // to encrypt the pasword
      const PasswordHash = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: PasswordHash,
      });
      await newUser.save();
      response.json({ message: "user registered sucessfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }

    // response.json({ message: "auth created sucessfully" });
  },
  // login
  login: async (request, response) => {
    try {
      const { email, password } = request.body;
      const user = await User.findOne({ email });
      if (!user) {
        return response.status(400).json({ message: "user does not exist" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return response.status(400).json({ message: "invalid password" });
      }
      const token = await jwt.sign(
        {
          id: user._id,
        },
        SECRET_KEY
      );
      response.json({ token, message: "user logged in sucessfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  // logout
  //   logout: (request, response) => {
  //     response.json({ message: "logout sucessfully done" });
  //   },
  // register
  me: async (request, response) => {
    try {
      const userId = request.userId;
      // console.log(userId);
      const user = await User.findById(userId).select(
        "-password -createdAt -updatedAt"
      );
      // select is ised to remove visibility  of data what are we dont want to see the datas

      response.json(user);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};
module.exports = authController;
