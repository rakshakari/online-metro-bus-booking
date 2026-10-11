const Seat = require("../models/seat");

// Create a new seat
const createSeat = async (req, res) => {
    try {
        const seat = new Seat(req.body);
        const savedSeat = await seat.save();

        res.status(201).json(savedSeat);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create seat",
            error: error.message
        });
    }
};

// Get all seats
const getAllSeats = async (req, res) => {
    try {
        const seats = await Seat.find();

        res.status(200).json(seats);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get seats",
            error: error.message
        });
    }
};

module.exports = {
    createSeat,
    getAllSeats
};