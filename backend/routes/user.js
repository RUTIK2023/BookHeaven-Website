const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const { authenticateToken } = require('./userAuth');

// schema import
const User = require('../models/user');

// sign-up rote
router.post('/sign-up', async (req, res) => {

    try {

        // get data
        const { username, email, password, address } = req.body;

        //check user already exist
        const existUser = await User.findOne({ email: email });

        if (existUser) {
            return res.status(400).json({
                message: "User already exist!",
            })
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
            address: address,
        });
        await newUser.save();

        return res.status(200).json({
            message: "User registerd successfully!",
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server error!",
            error: error
        })
    }

});


//login route
router.post('/login', async (req, res) => {

    try {

        // get data
        const { email, password } = req.body;

        // if user not exist
        const existUser = await User.findOne({ email });

        if (!existUser) {
            return res.status(400).json({
                message: "User not REgistered!",
            })
        }

        // password math or not
        await bcrypt.compare(password, existUser.password, (err, data) => {
            if (data) {

                // jswt token
                const authClaims = [
                    { name: existUser.username },
                    { email: existUser.email },
                    { role: existUser.role },
                ]
                const token = jwt.sign({ authClaims }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

                res.status(200).json({
                    id: existUser._id,
                    role: existUser.role,
                    token: token,
                    message: "Login successfully!",

                })
            }
            else {
                res.status(400).json({
                    message: "Password not match!",
                })
            }
        })



    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server error!",
            error: error
        })
    }

})


// get user info
router.get('/get-user-info', authenticateToken, async (req, res) => {

    try {
        const { id } = req.headers;
        const data = await User.findById(id).select('-password');
        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server error"
        });
    }

});

// update address
router.put('/update-address', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { address } = req.body;

        await User.findByIdAndUpdate(id, { address: address });
        return res.status(200).json({
            message: " Address updated ."
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server error"
        });
    }
})









module.exports = router;