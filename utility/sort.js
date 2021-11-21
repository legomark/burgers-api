module.exports.Sorting = {
    get: function (req) {
        return req.query.sort ?? "";
    },
};
