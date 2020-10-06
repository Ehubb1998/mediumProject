
const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors } = require("../utils");
const db = require("../db/models");
const { User } = db;
