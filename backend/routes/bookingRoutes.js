const express = require("express");
const router = express.Router();

console.log("BOOKING ROUTES FILE LOADED");

const {
    createBooking,
    getAllBookings,
    getBookingById
} = require("../controllers/bookingContoller");

// Create a booking
router.post("/", createBooking);

// Get all bookings
router.get("/", getAllBookings);

// Temporary test route
router.get("/test", (req, res) => {
    res.json({ message: "Booking route is working" });
});

// Get one booking by ID
router.get("/:id", getBookingById);

module.exports = router;