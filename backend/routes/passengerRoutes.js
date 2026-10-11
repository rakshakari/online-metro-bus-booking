const express = require("express");

const router = express.Router();

const {
    createPassenger,
    getAllPassengers
} = require("../controllers/passengercontroller");

// Create a new passenger
router.post("/", createPassenger);

// Get all passengers
router.get("/", getAllPassengers);

module.exports = router;