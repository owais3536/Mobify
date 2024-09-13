const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require('../model/user.model.js');
const authenticateToken = require('../middleware/authorization.js');

// Regisration
authRouter.post('/signup', async (req, res) => {
    const { name, email, password, address, phoneNumber } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    try {

        const isMatch = await User.findOne({ email: email });

        if (isMatch) return res.status(400).json({ message: 'User already exists' });

        const user = new User({
            name,
            email,
            password: hashed,
            address,
            phoneNumber
        });
        await user.save();

        const token = jwt.sign({ user: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: "1d" });

        return res.status(201)
            .json({
                error: false,
                user: user,
                accessToken: token,
                message: `User created successfully`
            });
    } catch (error) {
        return res
            .status(500)
            .json({ error: error.message });
    }
});

// Login
authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ Error: 'Email is required' });
    }

    if (!password) {
        return res.status(400).json({ Error: 'Password is required' });
    }

    const userInfo = await User.findOne({ email: email });

    if (!userInfo) {
        return res.status(404).json({ Error: 'No user found' });
    }

    const isMatch = await bcrypt.compare(password, userInfo.password);


    if (isMatch) {
        const accessToken = jwt.sign(
            { userID: userInfo._id, email: userInfo.email },
            process.env.SECRET_KEY, { expiresIn: "3d" }
        );

        return res.status(201).json({
            error: false,
            email: userInfo.email,
            userId: userInfo._id,
            accessToken: accessToken
        });
    } else {
        return res.status(500).json({
            error: true,
            message: `Invalid password`
        });
    }
});

authRouter.get('/user', authenticateToken, async (req, res) => {
    const user = req.user;

    try {
        if (!user) {
            return res.status(404).json({ Error: 'No user found' });
        }

        const userInfo = await User.findOne({ _id: user });
        if (!userInfo) return res.status(404).json({ message: 'User not found ' });

        return res.status(200).json(userInfo);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = authRouter;