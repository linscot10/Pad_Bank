const User = require("../model/User.model")
const mongoose = require("mongoose")


module.exports = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId)
        if (user?.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: 'Authentication failed'
            })
        }
        else {
            next()
        }

    } catch (error) {
        console.error("something Happened ", error)
        return res.status(500).json({
            success: false,
            message: "Authorization failed ,Admins Only",
            error
        })
    }
}