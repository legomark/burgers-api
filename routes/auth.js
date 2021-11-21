const _ = require("lodash");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

const invalidErrorMsg = "Invalid email or password!";

// login - user authentication
router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(`${error}`);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(invalidErrorMsg);

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!validPassword) return res.status(400).send(invalidErrorMsg);

    const token = user.generateAuthToken();
    res.send(token);
});

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(8).max(255).required(),
    });
    return schema.validate(req);
}

module.exports = router;
