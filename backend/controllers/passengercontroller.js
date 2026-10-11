const Passenger = require("../models/passenger");

// Create a new passenger
const createPassenger = async (req, res) => {
    try {
        const passenger = new Passenger(req.body);
        const savedPassenger = await passenger.save();

        res.status(201).json(savedPassenger);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create passenger",
            error: error.message
        });
    }
};

// Get all passengers
const getAllPassengers = async (req, res) => {
    try {
        const passengers = await Passenger.find();

        res.status(200).json(passengers);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get passengers",
            error: error.message
        });
    }
};

module.exports = {
    createPassenger,
    getAllPassengers
};