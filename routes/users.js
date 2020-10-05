const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors } = require("../utils");
const db = require("../db/models");
const { User } = db;

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

userRouter.post(
  "/",
  handleValidationErrors,
  validateUserName,
  validateEmailAndPassword,
  asyncHandler(async (req, res) => {
    // user creation logic here
    const { userName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ userName, email, hashedPassword });
  })
);

module.exports = userRouter;
