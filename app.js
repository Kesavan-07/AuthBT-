const express = require("express");
const logger = require("./utils/logger");
const morgan = require("morgan");
const ErrorRoute = require("./utils/error");
const authRouter = require("./routes/authroutes");
const app = express();
// to parse the datas
app.use(express.json());

// middeware to log
app.use(logger);
app.use(morgan("dev"));

// route path
app.use("/auth", authRouter);

// error route
app.use(ErrorRoute);

module.exports = app;
