const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../utils/config");

const auth = {
  verifyLogin: async (request, response, next) => {
    const authHeader = request.headers.authorization;

    // Validate the Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return response.status(401).json({ message: "Access denied" });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];

    try {
      // Verify the token
      const verified = jwt.verify(token, SECRET_KEY);
      request.userId = verified.id; // Attach user ID to the request
    } catch (error) {
      // Handle invalid token
      return response.status(400).json({ message: "Invalid token" });
    }

    next(); // Proceed to the next middleware or route handler
  },
};

module.exports = auth;
