// This is Back End
const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");
const bearerToken = require("express-bearer-token");

const followRouter = require("./routes/follows")
const commentRouter = require("./routes/comments");
const articleRouter = require("./routes/articles");
const userRouter = require("./routes/users");
const indexRouter = require("./routes/index");

app.use(bearerToken());
app.use(morgan("dev"));
app.use(express.json());
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/articles", articleRouter);
app.use(`/articles`, commentRouter);
app.use("/users", followRouter)

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");

app.get('/profile', (req, res) => {
  res.render('profile-page')
})

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  // console.log(err);
  res.status(err.status || 500);
  const errMsg = err.errors;
  // console.log(errMsg);
  if (err.user = false) {
    res.json({
      title: err.title,
      errors: errMsg,
      user: false
    });
  } else {
    res.json({
      title: err.title,
      errors: errMsg,
      password: false
    });
  }
});

module.exports = app;
