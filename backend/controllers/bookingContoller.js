const Booking = require("../models/booking");

// Create a booking
const createBooking = async (req, res) => {
    try {
        const {
            passengerId,
            passengerName,
            phone,
            email,
            busNumber,
            scheduleId,
            travelDate,
            seatNumber,
            boardingPoint,
            destination,
            fare
        } = req.body;

        if (
            !passengerId ||
            !passengerName ||
            !phone ||
            !email ||
            !busNumber ||
            !scheduleId ||
            !travelDate ||
            !seatNumber ||
            !boardingPoint ||
            !destination ||
            fare === undefined
        ) {
            return res.status(400).json({
                message: "Please provide all required booking details."
            });
        }

        if (!Number.isFinite(Number(fare)) || Number(fare) < 0) {
            return res.status(400).json({
                message: "Fare must be a valid non-negative number."
            });
        }

        const booking = new Booking({
            bookingId: "BK" + Date.now(),
            passengerId,
            passengerName,
            phone,
            email,
            busNumber,
            scheduleId,
            travelDate,
            seatNumber,
            boardingPoint,
            destination,
            fare: Number(fare),
            bookingStatus: "Confirmed"
        });

        const savedBooking = await booking.save();

        return res.status(201).json({
            message: "Booking created successfully.",
            booking: savedBooking
        });
    } catch (error) {
        console.error("Create booking error:", error);

        return res.status(500).json({
            message: "Failed to create booking.",
            error: error.message
        });
    }
};

// Get all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        return res.status(200).json(bookings);
    } catch (error) {
        console.error("Get bookings error:", error);

        return res.status(500).json({
            message: "Failed to retrieve bookings.",
            error: error.message
        });
    }
};

// Get one booking by MongoDB ID
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found."
            });
        }

        return res.status(200).json(booking);
    } catch (error) {
        return res.status(400).json({
            message: "Invalid booking ID."
        });
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById
};