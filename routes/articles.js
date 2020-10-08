const express = require("express");
const articleRouter = express.Router();
const { asyncHandler } = require("../utils");
const db = require("../db/models");
const { Article, User, Comment } = db;
const { check, validationResult } = require("express-validator");
const { requireAuth } = require("../auth");
const { router } = require("../app");
const userRouter = require("./users");




articleRouter.use(express.urlencoded());


articleRouter.get("/", async (req, res) => {
  const articles = await Article.findAll({include: "User"});
  res.render("display-articles", { articles });
});


articleRouter.get("/new", (req, res) => {
  res.render("create-article");
});
const articleValidations = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a title.")
    .isLength({ max: 100 }),
  check("body")
    .exists({ checkFalsy: true })
    .withMessage("Please provide article content."),
];

const articleNotFoundError = (articleId) => {
  const error = new Error();
  error.title = "Article Not Found";
  error.status = 404;
  error.message = `${articleId} was not found.`;
  return error;
};



articleRouter.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    const article = await Article.findByPk(id, {
      include: {model: Comment, as: 'comments', include: 'User'}
    });
    console.log(JSON.stringify(article))
    if (article === null) {
      next(articleNotFoundError(article));
    } else {

      // res.json({ articleId });
      res.render("display-article", {
        article,
        comments: article.comments,
      });

      // res.render("display-article", { article });

    }
  })
);

articleRouter.post(
  "/",
  requireAuth,
  articleValidations,
  asyncHandler(async (req, res) => {
    const { body, title } = req.body;

    const article = await Article.create({
      title,
      body,
      userId: req.user.id,
    });
    res.json({ article });
  })
);

articleRouter.get("/new", (req, res) => {
  res.render("create-article");
});

articleRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const article = await Article.findByPk(req.params.id);
    const comments = await Comment.findAll({
      where: {
        articleId: req.params.id
      }
    })

    res.render("display-article", {
      title: article.title,
      body: article.body,
      comments: comments,
    });
  })
);

articleRouter.put(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { body } = req.body;
    const articleId = await Article.findByPk(req.params.id);
    if (articleId === null) {
      next(articleNotFoundError(articleId));
    } else {
      articleId.body = `${body}`;
      await articleId.save();
      res.json({ articleId });
    }
  })
);

articleRouter.delete(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const articleId = await Article.findByPk(req.params.id);
    if (articleId === null) {
      next(articleNotFoundError(articleId));
    } else {
      await articleId.destroy({
        where: {
          articleId,
        },
      });
    }
    res.redirect("/");
  })
);

module.exports = articleRouter;
