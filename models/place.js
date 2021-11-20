const Joi = require("joi");
const mongoose = require("mongoose");

const Place = mongoose.model(
    "Place",
    mongoose.Schema({
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
    })
);

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
