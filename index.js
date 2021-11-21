const dotenv = require("dotenv");
dotenv.config();

require("express-async-errors");
const express = require("express");
const config = require("config");
const app = express();

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();

const port = process.env.PORT || config.get("port");
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}...`);
});
