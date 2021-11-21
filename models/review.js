const Joi = require("joi");
const mongoose = require("mongoose");

const Review = mongoose.model(
    "Review",
    mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        place: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Place",
        },
        taste: {
            type: Number,
            required: true,
            min: 1,
            max: 10,
        },
        texture: {
            type: Number,
            required: true,
            min: 1,
            max: 10,
        },
        visualPresentation: {
            type: Number,
            required: true,
            min: 1,
            max: 10,
        },
        score: {
            type: Number,
            required: true,
            min: 1,
            max: 10,
        },
    })
);

function validateReview(review) {
    const schema = Joi.object({
        place: Joi.string(),
        taste: Joi.number().integer().min(1).max(10).required(),
        texture: Joi.number().integer().min(1).max(10).required(),
        visualPresentation: Joi.number().integer().min(1).max(10).required(),
    });
    return schema.validate(review);
}

module.exports.Review = Review;
module.exports.validate = validateReview;
