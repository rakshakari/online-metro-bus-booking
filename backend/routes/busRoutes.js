
const express = require("express");
const router = express.Router();

const {
    createBus,
    getAllBuses,
    updateBus,
    deleteBus
} = require("../controllers/buscontroller");

// Add a bus
router.post("/", createBus);

// View all buses
router.get("/", getAllBuses);

// Update a bus
router.put("/:id", updateBus);

// Delete a bus
router.delete("/:id", deleteBus);

module.exports = router;
