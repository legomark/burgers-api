const Joi = require("joi");

// todo: refactor and restructure validation

module.exports = function () {
    Joi.objectId = require("joi-objectid")(Joi);
};
