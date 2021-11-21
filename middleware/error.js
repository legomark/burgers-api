module.exports = function (err, req, res, next) {
    // todo: log exception
    res.status(500).send("Sorry, something failed...");
};
