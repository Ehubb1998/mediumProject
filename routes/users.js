const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcryptjs");
const { getUserToken, requireAuth } = require("../auth");
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors } = require("../utils");
const db = require("../db/models");
const { use } = require("../app");
const { User } = db;

// userRouter.use(requireAuth);

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

userRouter.get("/", (req, res) => {
  res.send("Hello");
});

userRouter.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

userRouter.get("/log-in", (req, res) => {
  res.render("log-in");
});

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

module.exports = userRouter;
