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



module.exports = router;