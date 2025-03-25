const express = require("express")
const User = require('../model/User.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerController = async (req, res) => {
    try {
        // console.log(req.body);
        const existingUser = await User.findOne({ email: req.body.email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists"
            })
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword

        const user = new User(req.body)

        await user.save();

        // console.log(user);


        if (user) {
            res.status(201).json({
                success: true,
                message: "User created successfully",
                user
            })

        }
        else {
            res.status(400).json({
                success: false,
                message: " Unable to register User! Please try again"
            })
        }

    } catch (error) {
        console.error("Error during user registration:", error)
        res.status(500).json({
            success: false,
            message: "Error in Registered API", error
        })
    }
}

const loginController = async (req, res) => {
    try {
        // console.log(req.body);

        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(404).json({
                success: false,
                message: "invalid credentials"
            })
        }

        if (user.role !== req.body.role) {
            return res.status(500).json({
                success: false,
                message: "role doesnt match"
            })
        }


        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if (!comparePassword) {
            return res.status(500).json({
                success: false,
                message: "invalid credentials"
            })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).json({
            success: true,
            message: "Logged In successfully",
            token,
            user
        })
    } catch (error) {
        console.error("Something Happened", error)
        res.status(500).json({
            success: false,
            message: "Something Went Wrong"
        })
    }
}


// not pulling the correct user
const currentUserController = async (req, res) => {
    try {
        // console.log(req.body.email);
        const user = await User.findOne({ _id: req.user.userId })
        // console.log(user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User Fetched Successfully",
            user
        })

    } catch (error) {
        console.error("User Not Found", error)
        return res.status(404).json({
            success: false,
            message: "User Not Found"
        })
    }
}
module.exports = {
    registerController,
    loginController,
    currentUserController
}