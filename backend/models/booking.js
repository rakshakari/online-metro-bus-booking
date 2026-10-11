
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        bookingId: {
            type: String,
            required: true,
            unique: true
        },
        passengerId: {
            type: String,
            required: true
        },
        passengerName: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        busNumber: {
            type: String,
            required: true
        },
        scheduleId: {
            type: String,
            required: true
        },
        travelDate: {
            type: Date,
            required: true
        },
        seatNumber: {
            type: String,
            required: true
        },
        boardingPoint: {
            type: String,
            required: true
        },
        destination: {
            type: String,
            required: true
        },
        fare: {
            type: Number,
            required: true,
            min: 0
        },
        bookingStatus: {
            type: String,
            enum: ["Pending", "Confirmed", "Cancelled"],
            default: "Confirmed"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
