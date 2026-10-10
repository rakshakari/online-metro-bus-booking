const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
    busNumber: {
        type: String,
        required: true,
        unique: true
    },

    busName: {
        type: String,
        required: true
    },

    busType: {
        type: String,
        required: true
    },

    totalSeats: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        default: "Available"
    }
});

module.exports = mongoose.model("Bus", busSchema);