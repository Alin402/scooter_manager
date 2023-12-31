const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/user')
const { protect } = require('../middleware/auth');
const { body } = require("express-validator");
const User = require("../models/user");

router.post('/', [
  body("name").notEmpty().withMessage("Name is required"),
  body("isAdmin").notEmpty().withMessage("Account type is required"),
  body("email").isEmail().withMessage("Email is not valid"),
  body("password").isLength({ min: 8 }).withMessage("The password must have a minimum of 8 characters"),
  body('email').custom(async value => {
    const user = await User.findOne({ email: value });
    if (user) {
      throw new Error('Email already in use');
    }
  }),
], registerUser)
router.post('/login', [
  body('email').custom(async value => {
    const user = await User.findOne({ email: value });
    if (!user) {
      throw new Error('Email not registered or empty');
    }
  }),
], loginUser)
router.get('/me', protect, getMe)

module.exports = router