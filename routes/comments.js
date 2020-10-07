const express = require("express");
const commentRouter = express.Router();
const { asyncHandler } = require("../utils");
const db = require("../db/models");
const { Article, Comment } = db;
const { check, validationResult } = require("express-validator");
const { requireAuth } = require("../auth");
const { router } = require("../app");
const userRouter = require("./users");

commentRouter.use(express.urlencoded());

commentRouter.get("/", (req, res) => {
    res.render('create-comment');
  });

module.exports = commentRouter;
