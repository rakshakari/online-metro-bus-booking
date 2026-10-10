const Schedule = require("../models/schedule");

// Create a new schedule
const createSchedule = async (req, res) => {
    try {
        const schedule = new Schedule(req.body);
        const savedSchedule = await schedule.save();

        res.status(201).json(savedSchedule);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create schedule",
            error: error.message
        });
    }
};

// Get all schedules
const getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find();

        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get schedules",
            error: error.message
        });
    }
};


module.exports = {
    createSchedule,
    getAllSchedules
};