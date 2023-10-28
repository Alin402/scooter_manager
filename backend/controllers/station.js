const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const Station = require("../models/stationModel");
const { ObjectId } = require('mongodb');

const addStation = asyncHandler(async (req, res) => {
    const { stationName, noOfScooters, coords } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        let station = await Station.findOne({ name: stationName });
        console.log(station)
        if (station) {
            return res.status(400).json({ errors: [ { msg: "A station with that name already exists" } ] });
        }
        station = await Station.create({
            name: stationName,
            coords
        })

        for (let i = 0; i < noOfScooters; i++) {
            station.scooters.push({
                batteryLevel: 100,
                stationId: station.id
            })
        }

        await station.save();
        res.status(200).json({ station })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [ { msg: "Server Error" } ] });
    }
})

const getStation = asyncHandler(async (req, res) => {
    try {
        const stations = await Station.find();
        res.status(200).json({ stations })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [ { msg: "Server Error" } ] });
    }
})

const reserveStation = asyncHandler(async (req, res) => {
    const { stationId, scooterId } = req.body;
    try {
        const station = await Station.findById(stationId);
        if (!station) {
            return res.status(404).json({ errors: [{ msg: "Station not found" }] });
        }
        station.scooters.map(scooter => {
            if (scooter.id === scooterId) {
                return {
                    ...scooter,
                    reservedUserId: 12
                }
            }
            return scooter;
        })
        await station.save();
        return res.status(200).json({ user: req.user })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [ { msg: "Server Error" } ] });
    }
})

module.exports = {
    getStation,
    addStation,
    reserveStation
}