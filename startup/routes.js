const express = require("express");
const places = require("../routes/places");
const reviews = require("../routes/reviews");
const users = require("../routes/users");
const auth = require("../routes/auth");

module.exports = function (app) {
    app.use(express.json());
    app.use("/api/places", places);
    app.use("/api/reviews", reviews);
    app.use("/api/users", users);
    app.use("/api/auth", auth);
};
