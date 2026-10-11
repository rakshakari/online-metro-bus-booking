
const Bus = require("../models/bus");

// Search buses by number, name, or type
const searchBuses = async (req, res) => {
    try {
        const searchText = (req.query.q || "").trim();

        if (!searchText) {
            return res.status(400).json({
                message: "Please enter a search term."
            });
        }

        const buses = await Bus.find({
            $or: [
                { busNumber: { $regex: searchText, $options: "i" } },
                { busName: { $regex: searchText, $options: "i" } },
                { busType: { $regex: searchText, $options: "i" } }
            ]
        });

        res.status(200).json(buses);
    } catch (error) {
        res.status(500).json({
            message: "Failed to search buses",
            error: error.message
        });
    }
};

module.exports = { searchBuses };
