const mongoose = require("mongoose")

userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: ['donor', 'admin', 'government', 'school']
    },
    name: {
        type: String,
        required: function () {
            if (this.role === 'donor' || this.role === 'admin') {
                return true
            }
            return false
        }
    },
    GovernmentName: {
        type: String,
        required: function () {
            if (this.role === 'government') {
                return true
            }
            return false
        }
    },
    schoolName: {
        type: String,
        required: function () {
            if (this.role === 'school') {
                return true
            }
            return false
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    website: {
        type: String
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    phone: {
        type: String,
        required: [true, 'phone is required'],
    },

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)


