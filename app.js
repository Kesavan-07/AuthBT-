const express = require("express");
const logger = require("./utils/logger");
const morgan = require("morgan");
const ErrorRoute = require("./utils/error");
const authRouter = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(logger);
app.use(morgan("dev"));
app.use("/auth", authRouter);
app.use(ErrorRoute);

module.exports = app;
