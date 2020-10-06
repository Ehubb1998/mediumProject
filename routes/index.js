const express = require("express");
const indexRouter = express.Router();
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors } = require("../utils");
const db = require("../db/models");
const { User } = db;

indexRouter.get("/", (req, res) => {
  res.render("splash");
});

module.exports = indexRouter;
