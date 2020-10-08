const express = require("express");
const followRouter = express.Router();
const { check, validationResult } = require("express-validator");

const { asyncHandler } = require("../utils");
const db = require("../db/models");
const { User, Following } = db;
const { requireAuth } = require("../auth");
const { router } = require("../app");
const userRouter = require("./users");

followRouter.use(express.urlencoded());

followRouter.post("/:id(\\d+)/addFollow", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);

    const author = await User.findByPk(id);
    const follower = await User.findByPk(id);

    await author.addFollower(follower);
    await author.save();
    // res.json({ author });

    const follow = await Following.create({
        authorId: author,
        followerId: follower
    });

    res.redirect('/')

}));

followRouter.get("/:id(\\d+)/followedAuthors", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const author = await User.findByPk(id, {
        include: {
            model: User,
            as: 'followedAuthors'
        }
    });
    const followedAuthors = author.followedAuthors.map((author) => ({username: author.username, email: author.email}));
    res.json({ followedAuthors });
}));

followRouter.get("/:id(\\d+)/followers", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const author = await User.findByPk(id, {
        include: {
            model: User,
            as: 'followers'
        }
    });
    const followers = author.followers.map((follower) => ({username: follower.username, email: follower.email}));
    res.json({ followers });
}));

module.exports = followRouter;
