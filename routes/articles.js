const express = require("express");
const articleRouter = express.Router();
const { asyncHandler } = require("../utils");
const db = require("../db/models");
const { Article } = db;
const { check, validationResult } = require("express-validator");
const { requireAuth } = require("../auth");
const { router } = require("../app");
const userRouter = require("./users");

articleRouter.use(express.urlencoded());
// articleRouter.use(requireAuth);

articleRouter.get("/", (req, res) => {
    res.send("Articles Homepage");
})
articleRouter.get("/new", (req, res) => {
    res.render("create-article");
})
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
  "/",
  (req, res) => {
      res.send("these are articles.")
});

articleRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const articles = await Article.findall({
      include: [{ model: User, as: "user", attributes: ["userName"] }],
      order: [["createdAt", "DESC"]],
      attributes: ["title"],
    });
    res.json({ articles });
  })
);

articleRouter.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const articleId = await Article.findByPk(req.params.id);
    if (articleId === null) {
      next(articleNotFoundError(articleId));
    } else {
      res.json({ articleId });
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
      userId: req.user.id
    });
    res.json({ article });
  })
);

articleRouter.get("/new", (req, res) => {
  res.render("create-article");
});

articleRouter.get("/:id", asyncHandler( async(req, res) => {
  const article = await Article.findByPk(req.params.id);
  res.render("display-article",
  { title: article.title, body: article.body, comments: article.comments })
}));


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
