const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

const notFoundErrorMsg = "User with the given ID cannot be found.";

router.get("/", async (req, res) => {
    const users = await User.find().select("-__v -password").sort("name");
    res.send(users);
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(`${error}`);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    user = new User(_.pick(req.body, ["name", "email", "password"]));
    // todo: use joi-password-complexity?
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.status(201).send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
