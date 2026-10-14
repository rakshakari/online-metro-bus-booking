const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const mongoose = require("mongoose");


async function copyBuses() {
    try {
        const uri =
            process.env.MONGO_URI ||
            process.env.MONGODB_URI ||
            process.env.MONGO_URL;

        if (!uri) {
            throw new Error(
                "MongoDB URI not found. Check the variable name in server.js."
            );
        }

        await mongoose.connect(uri);

        const sourceDB = mongoose.connection.useDb("test");
        const targetDB = mongoose.connection.useDb(
            "online_metro_bus_booking"
        );

        const buses = await sourceDB
            .collection("buses")
            .find({})
            .toArray();

        console.log("Buses found in test:", buses.length);

        if (buses.length === 0) {
            console.log("No buses found. Nothing copied.");
            return;
        }

        const targetCollection = targetDB.collection("buses");
        const existingCount = await targetCollection.countDocuments();

        if (existingCount > 0) {
            console.log(
                "Target collection is not empty. Nothing copied."
            );
            return;
        }

        await targetCollection.insertMany(buses);

        console.log(
            "Success! Copied",
            buses.length,
            "buses into online_metro_bus_booking.buses"
        );
    } catch (error) {
        console.error("Copy failed:", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

copyBuses();
