const express = require("express");

const router = express.Router();

const {
    createBus,
    getAllBuses
} = require("../controllers/buscontroller");
// Create a new bus
router.post("/", createBus);

// Get all buses
router.get("/", getAllBuses);

module.exports = router;