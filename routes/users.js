const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcryptjs");
const { getUserToken, requireAuth } = require("../auth");
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors } = require("../utils");
const db = require("../db/models");
const { User } = db;

userRouter.use(requireAuth);

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

userRouter.get("/", async (req, res) => {
  res.send("Hello!");
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

module.exports = userRouter;
