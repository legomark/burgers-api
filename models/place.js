const Joi = require("joi");
const mongoose = require("mongoose");

const placeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    location: {
        type: String,
        minlength: 3,
        maxlength: 255,
    },
    openingTimes: {
        type: String,
        minlength: 3,
        maxlength: 255,
    },
    reviewCount: {
        type: Number,
        min: 0,
        default: 0,
    },
    avgScore: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
    avgTaste: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
    avgTexture: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
    avgVisualPresentation: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
});

placeSchema.methods.submitReview = function (review) {
    // todo: refactor
    this.avgScore = calculateScore(
        this.avgScore,
        review.score,
        this.reviewCount
    );
    this.avgTaste = calculateScore(
        this.avgTaste,
        review.taste,
        this.reviewCount
    );
    this.avgTexture = calculateScore(
        this.avgTexture,
        review.texture,
        this.reviewCount
    );
    this.avgVisualPresentation = calculateScore(
        this.avgVisualPresentation,
        review.visualPresentation,
        this.reviewCount
    );
    ++this.reviewCount;
    this.save();
};

function calculateScore(avg, newScore, count) {
    return (avg * count + newScore) / (count + 1);
}

const Place = mongoose.model("Place", placeSchema);

function validatePlace(place) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        location: Joi.string().min(3).max(255),
        openingTimes: Joi.string().min(3).max(255),
    });
    return schema.validate(place);
}

module.exports.Place = Place;
module.exports.validate = validatePlace;
