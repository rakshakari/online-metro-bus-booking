const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
    seatNumber: {
        type: String,
        required: true
    },

    busNumber: {
        type: String,
        required: true
    },

    seatType: {
        type: String,
        default: "Regular"
    },

    status: {
        type: String,
        default: "Available"
    }
});

module.exports = mongoose.model("Seat", seatSchema);