const winston = require("winston");
require("express-async-errors");

module.exports = function () {
    winston.exceptions.handle(
        new winston.transports.File({ filename: "uncaughtExceptions.log" })
    );

    winston.level = "info";
    winston.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        })
    );
    winston.add(new winston.transports.File({ filename: "logfile.log" }));
};

// Logging levels:
// error
// warn
// info
// verbose
// debug
// silly
