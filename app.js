// This is Back End
const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");
const { allowedNodeEnvironmentFlags } = require("process");

const userRouter = require("./routes/users");
const indexRouter = require("./routes/users");

app.use(morgan("dev"));
app.use(express.json());
app.use("/users", userRouter);
app.use("/", indexRouter);
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "pug");

<<<<<<< HEAD
userRouter.get("/sign-up", (req, res) => {
  res.render("sign-up");
=======
userRouter.get("/", (req, res) => {
  res.render("create-user");
>>>>>>> master
});

module.exports = app;
