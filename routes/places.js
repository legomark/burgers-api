const express = require("express");
const router = express.Router();

const notFoundErrorMsg = "The Burger Place with the given ID cannot be found.";

const places = [
    {
        id: 1,
        name: "Burger Place 1",
        location: "Budapest",
        openingTimes: "24/7",
    },
    {
        id: 2,
        name: "Burger Place 2",
        location: "Budapest",
        openingTimes: "24/7",
    },
    {
        id: 3,
        name: "Burger Place 3",
        location: "Budapest",
        openingTimes: "24/7",
    },
];

router.get("/", (req, res) => {
    res.send(places);
});

router.get("/:id", (req, res) => {
    const place = places.find(p => p.id === parseInt(req.params.id));
    if (!place) {
        return res.status(404).send(notFoundErrorMsg);
    }
    res.send(place);
});

router.post("/", (req, res) => {
    const place = {
        id: places.length + 1,
        name: req.body.name,
        location: req.body.location,
        openingTimes: req.body.openingTimes,
    };
    places.push(place);
    res.send(place);
});

router.put("/:id", (req, res) => {
    const place = places.find(p => p.id === parseInt(req.params.id));
    if (!place) {
        return res.status(404).send(notFoundErrorMsg);
    }
    if ("name" in req.body) place.name = req.body.name;
    if ("location" in req.body) place.location = req.body.location;
    if ("openingTimes" in req.body) place.openingTimes = req.body.openingTimes;
    res.send(place);
});

router.delete("/:id", (req, res) => {
    const place = places.find(p => p.id === parseInt(req.params.id));
    if (!place) {
        return res.status(404).send(notFoundErrorMsg);
    }
    const index = places.indexOf(place);
    places.splice(index, 1);
    res.send(place);
});

module.exports = router;
