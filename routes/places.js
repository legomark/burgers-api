const _ = require("lodash");
const { Place, validate } = require("../models/place");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Filter } = require("../utility/filter");
const { Sorting } = require("../utility/sort");
const express = require("express");
const router = express.Router();

const notFoundErrorMsg = "The Burger Place with the given ID cannot be found.";

router.get("/", async (req, res) => {
    const sorting = Sorting.get(req);
    const filters = Filter.get(req);
    const { error } = Filter.validate(filters);
    if (error) return res.status(400).send(`${error}`);

    const places = await Place.find(filters).sort(sorting).select("-__v");
    res.send(places);
});

router.get("/:id", async (req, res) => {
    const place = await Place.findById(req.params.id).select("-__v");
    if (!place) return res.status(404).send(notFoundErrorMsg);
    res.send(place);
});

router.post("/", auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(`${error}`);

    const place = new Place({
        name: req.body.name,
        location: req.body.location,
        openingTimes: req.body.openingTimes,
    });
    await place.save();
    res.status(201).send(
        _.pick(place, ["id", "name", "location", "openingTimes"])
    );
});

router.put("/:id", auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(`${error}`);

    const place = await Place.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            location: req.body.location,
            openingTimes: req.body.openingTimes,
        },
        { new: true }
    ).select("-__v");
    if (!place) return res.status(404).send(notFoundErrorMsg);
    res.send(place);
});

router.delete("/:id", [auth, admin], async (req, res) => {
    const place = await Place.findByIdAndRemove(req.params.id).select("-__v");
    if (!place) return res.status(404).send(notFoundErrorMsg);
    res.send(place);
});

module.exports = router;
