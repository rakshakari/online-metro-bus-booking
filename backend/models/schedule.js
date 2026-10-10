const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    scheduleId: {
        type: String,
        required: true,
        unique: true
    },

    routeNumber: {
        type: String,
        required: true
    },

    busNumber: {
        type: String,
        required: true
    },

    departureTime: {
        type: String,
        required: true
    },

    arrivalTime: {
        type: String,
        required: true
    },

    operatingDays: {
        type: [String],
        default: []
    },

    status: {
        type: String,
        default: "Active"
    }
});

module.exports = mongoose.model("Schedule", scheduleSchema);