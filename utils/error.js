const ErrorRoute = (request, response) => {
  response.status(404).json({ message: "Route not found" });
};

module.exports = ErrorRoute;
