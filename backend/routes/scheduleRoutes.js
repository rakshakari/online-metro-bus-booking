console.log("Schedule routes loaded");

const express = require("express");

const router = express.Router();

const {
    createSchedule,
    getAllSchedules
} = require("../controllers/schedulecontroller");

// Create a new schedule
router.post("/", createSchedule);

// Get all schedules
router.get("/", getAllSchedules);

// Test route
router.get("/test", (req, res) => {
    res.json({ message: "Schedule route is working" });
});

module.exports = router;