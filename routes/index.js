const express = require("express");
const router = express.Router();
const { getUserToken, requireAuth } = require("../auth");

router.get("/", async (req, res) => {
  res.render("index");
});

router.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

router.get("/log-in", (req, res) => {
  res.render("log-in");
});



router.get("/coming-soon", (req, res) => {
  res.render("coming-soon");
});

// router.get("/create", (req, res) => {
//   res.render("create");
// });

// router.get("/profile", (req, res) => {
//   res.render("profile");
// });

module.exports = router;
