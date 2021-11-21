const winston = require("winston");

module.exports = function (err, req, res, next) {
    winston.error(err.message, err);
    res.status(500).send("Sorry, something failed...");
};

// This will only catch errors during the request processing pipeline
