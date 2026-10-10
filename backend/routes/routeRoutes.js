const express = require("express");

const router = express.Router();

const {
    createRoute,
    getAllRoutes
} = require("../controllers/routecontroller");

// Create a new route
router.post("/", createRoute);

// Get all routes
router.get("/", getAllRoutes);

module.exports = router;