// This is Back End
const express = require("express");
const morgan = require("morgan");
const app = express();

const userRouter = require("./routes/users");

app.use(morgan("dev"));
app.use(express.json());
app.use("/users", userRouter);

module.exports = app;
