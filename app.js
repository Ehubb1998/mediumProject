// This is Back End
const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");

const userRouter = require("./routes/users");
const indexRouter = require("./routes/users");
const { requireAuth } = require("./auth");
const { asyncHandler } = require("./utils");

app.use(morgan("dev"));
app.use(express.json());
app.use("/users", userRouter);
app.use("/", indexRouter);
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("create-user");
});

// app.get("/articles/:id", asyncHandler( async(req, res) => {
//     const article = await Article.findByPk(req.params.id);
//     res.render("display-article",
//     { title: article.title, body: article.body, comments: article.comments })
// })

module.exports = app;
