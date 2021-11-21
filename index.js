const dotenv = require("dotenv");
dotenv.config();

const winston = require("winston");
const express = require("express");
const config = require("config");
const app = express();

require("./startup/logging");
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || config.get("port");
app.listen(port, () => {
    winston.info(`Listening on port ${port}...`);
});
