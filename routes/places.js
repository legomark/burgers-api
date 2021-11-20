const { Place, validate } = require("../models/place");
const express = require("express");
const router = express.Router();

const notFoundErrorMsg = "The Burger Place with the given ID cannot be found.";

router.get("/", async (req, res) => {
    const places = await Place.find().select("-__v").sort("name");
    res.send(places);
});

router.get("/:id", (req, res) => {
    const place = places.find(p => p.id === parseInt(req.params.id));
    if (!place) return res.status(404).send(notFoundErrorMsg);
    res.send(place);
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(`${error}`);

    const place = new Place({
        name: req.body.name,
        location: req.body.location,
        openingTimes: req.body.openingTimes,
    });
    await place.save();
    res.status(201).send(place);
});

router.put("/:id", async (req, res) => {
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
    );
    if (!place) return res.status(404).send(notFoundErrorMsg);
    res.send(place);
});

router.delete("/:id", async (req, res) => {
    const place = await Place.findByIdAndRemove(req.params.id);
    if (!place) return res.status(404).send(notFoundErrorMsg);
    res.send(place);
});

module.exports = router;
