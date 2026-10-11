const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema({
    passengerId: {
        type: String,
        required: true,
        unique: true
    },

    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Active"
    }
});

module.exports = mongoose.model("Passenger", passengerSchema);