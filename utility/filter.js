const Joi = require("joi");

module.exports.Filter = {
    get: function (req) {
        const filters = {};
        for (const [key, value] of Object.entries(req.query)) {
            if (key !== "sort") {
                filters[key] = value;
            }
        }
        return filters;
    },
    validate: function (filters) {
        const schema = Joi.object({
            _id: Joi.objectId(),
            name: Joi.string().min(3).max(255),
            email: Joi.string().email().max(255),
            place: Joi.objectId(),
            user: Joi.objectId(),
            location: Joi.string().min(3).max(255),
            openingTimes: Joi.string().min(3).max(255),
            reviewCount: Joi.number().min(0),
            score: Joi.number().min(0).max(10),
            taste: Joi.number().min(0).max(10),
            texture: Joi.number().min(0).max(10),
            visualPresentation: Joi.number().min(0).max(10),
            avgScore: Joi.number().min(0).max(10),
            avgTaste: Joi.number().min(0).max(10),
            avgTexture: Joi.number().min(0).max(10),
            avgVisualPresentation: Joi.number().min(0).max(10),
        });
        return schema.validate(filters);
    },
};
