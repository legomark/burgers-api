const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024,
    },
    isAdmin: {
        type: Boolean,
    },
    reviews: [
        {
            place: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Place",
            },
            score: {
                type: Number,
                required: true,
                min: 1,
                max: 10,
            },
        },
    ],
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
            isAdmin: this.isAdmin,
        },
        config.get("jwtPrivateKey")
    );
    return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(8).max(255).required(),
    });
    return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;
