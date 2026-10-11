console.log("Seat routes loaded");

const express = require("express");

const router = express.Router();

const {
    createSeat,
    getAllSeats
} = require("../controllers/seatcontroller");

router.get("/test", (req, res) => {
    res.json({ message: "Seat route is working" });
});

router.post("/", createSeat);

router.get("/", getAllSeats);

module.exports = router;