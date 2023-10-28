const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const { validationResult } = require("express-validator");

const registerUser = asyncHandler(async (req, res) => {
    const { email, name, password, isAdmin } = req.body;

    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            isAdmin
        })

        if (!user) {
            res.status(400);
            throw new Error("Invalid user data");
        }

        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findOne({ email });
        const userPassword = user.password;
        
        const passwordsMatch = await bcryptjs.compare(password, userPassword);

        if (!passwordsMatch) {
            return res.status(400).json({ 
                errors: [
                    {
                        type: "field",
                        value: userPassword,
                        msg: "The provided password is not correct or is empty",
                        path: 'password',
                        location: 'body'
                    }
                ]
            });
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET);

        res.status(200).json({
            token
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
})

const getMe = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ user });
        return res.status(200).json({ user: req.user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" }); 
    }
})

module.exports = {
    registerUser,
    loginUser,
    getMe
}