// This is Back End
const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");

const userRouter = require("./routes/users");

app.use(morgan("dev"));
app.use(express.json());
app.use("/users", userRouter);
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "pug");

app.get("/", (req, res) => {
    res.render("create-user");
})
module.exports = app;
