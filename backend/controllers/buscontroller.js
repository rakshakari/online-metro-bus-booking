const Bus = require("../models/bus");

// Create a new bus
const createBus = async (req, res) => {
    try {
        const bus = new Bus(req.body);
        const savedBus = await bus.save();

        res.status(201).json(savedBus);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create bus",
            error: error.message
        });
    }
};

// Get all buses
const getAllBuses = async (req, res) => {
    try {
        const buses = await Bus.find();

        res.status(200).json(buses);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get buses",
            error: error.message
        });
    }
};

module.exports = {
    createBus,
    getAllBuses
};