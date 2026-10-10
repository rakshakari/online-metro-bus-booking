const Route = require("../models/route");

// Create a new route
const createRoute = async (req, res) => {
    try {
        const route = new Route(req.body);
        const savedRoute = await route.save();

        res.status(201).json(savedRoute);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create route",
            error: error.message
        });
    }
};

// Get all routes
const getAllRoutes = async (req, res) => {
    try {
        const routes = await Route.find();

        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get routes",
            error: error.message
        });
    }
};

module.exports = {
    createRoute,
    getAllRoutes
};