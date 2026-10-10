const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
    routeNumber: {
        type: String,
        required: true,
        unique: true
    },

    startLocation: {
        type: String,
        required: true
    },

    endLocation: {
        type: String,
        required: true
    },

    stops: {
        type: [String],
        default: []
    },

    distance: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        default: "Active"
    }
});

module.exports = mongoose.model("Route", routeSchema);