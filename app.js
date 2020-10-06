// This is Back End
const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");

const articleRouter = require("./routes/articles");
const userRouter = require("./routes/users");
const indexRouter = require("./routes/index");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/articles", articleRouter);

app.set("view engine", "pug");

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.status = 404;
  next(err);
});

module.exports = app;
