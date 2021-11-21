const _ = require("lodash");
const { Review, validate } = require("../models/review");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();

const notFoundErrorMsg = "The Review with the given ID cannot be found.";

router.get("/", async (req, res) => {
    const reviews = await Review.find().select("-__v");
    res.send(reviews);
});

router.get("/:id", async (req, res) => {
    const review = await Review.findById(req.params.id).select("-__v");
    if (!review) return res.status(404).send(notFoundErrorMsg);
    res.send(review);
});

router.post("/", auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(`${error}`);

    const { taste, texture, visualPresentation } = req.body;
    const score = (taste + texture + visualPresentation) / 3;

    const review = new Review({
        user: req.user._id,
        place: req.body.place,
        taste: req.body.taste,
        texture: req.body.texture,
        visualPresentation: req.body.visualPresentation,
        score: score,
    });
    review.save();

    const user = await User.findById(review.user);
    user.reviews.push(_.pick(review, ["_id", "place", "score"]));
    user.save();

    res.status(201).send(review);
});

module.exports = router;
