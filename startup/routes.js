const express = require("express");
const places = require("../routes/places");

module.exports = function (app) {
    app.use(express.json());
    app.use("/api/places", places);
};
