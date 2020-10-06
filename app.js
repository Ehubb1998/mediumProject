// This is Back End
const express = require("express");
const app = express();

const userRouter = require("./routes/users");
const indexRouter = require("./index");

app.use("/users", userRouter);
app.use("/", indexRouter);

module.exports = app;
