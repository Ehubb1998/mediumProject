const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcryptjs");
const { getUserToken, requireAuth } = require("../auth");
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors } = require("../utils");
const db = require("../db/models");
const { use } = require("../app");
const { User } = db;

User.prototype.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.hashedPassword.toString());
};

const validateUserName = check("userName")
  .exists({ checkFalsy: true })
  .withMessage("Please provide a valid User Name");

const validateEmailAndPassword = [
  check("hashedPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid Password"),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid Email"),
];

const validateUserNameAndPassword = [
  check("userName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid User Name"),
  check("hashedPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid Password"),
];

userRouter.post(
  "/",
  handleValidationErrors,
  validateUserName,
  validateEmailAndPassword,
  asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ userName, email, hashedPassword });

    const token = getUserToken(user);
    res.status(201).json({
      user: { id: user.id },
      token,
    });
  })
);

userRouter.post(
  "/token",
  validateUserNameAndPassword,
  asyncHandler(async (req, res, next) => {
    const { userName, password } = req.body;
    const user = await User.findOne({
      where: {
        userName,
      },
    });

    if (!user || !user.validate(password)) {
      const err = new Error("Login failed");
      err.status = 401;
      err.title = "Login failed";
      err.errors = "The provided credentials were invalid.";
      return next(err);
    }

    const token = getUserToken(user);
    res.json({ token, user: { id: user.id } });
  })
);

userRouter.get("/:id", requireAuth, async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (user) {
    res.send({ user });
  } else {
    next();
  }
});

module.exports = userRouter;
