const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth');
const { addStation, getStation, reserveStation } = require("../controllers/station");
const { body } = require("express-validator");

router.post('/', [
    body("stationName").notEmpty().withMessage("Name is required"),
    body("noOfScooters").notEmpty().withMessage("Number of scooters is required"),
    body("coords").notEmpty().withMessage("The coords are required")
], addStation);

router.get('/', protect, getStation);
router.post('/book', protect, reserveStation);

module.exports = router;