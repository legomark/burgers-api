const express = require("express");
const places = require("../routes/places");
const users = require("../routes/users");

module.exports = function (app) {
    app.use(express.json());
    app.use("/api/places", places);
    app.use("/api/users", users);
};
