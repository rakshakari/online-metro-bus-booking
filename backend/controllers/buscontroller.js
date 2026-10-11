
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

// Update a bus by its ID
const updateBus = async (req, res) => {
    try {
        const updatedBus = await Bus.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedBus) {
            return res.status(404).json({
                message: "Bus not found"
            });
        }

        res.status(200).json(updatedBus);
    } catch (error) {
        res.status(400).json({
            message: "Failed to update bus",
            error: error.message
        });
    }
};

// Delete a bus by its ID
const deleteBus = async (req, res) => {
    try {
        const deletedBus = await Bus.findByIdAndDelete(req.params.id);

        if (!deletedBus) {
            return res.status(404).json({
                message: "Bus not found"
            });
        }

        res.status(200).json({
            message: "Bus deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to delete bus",
            error: error.message
        });
    }
};

module.exports = {
    createBus,
    getAllBuses,
    updateBus,
    deleteBus
};
