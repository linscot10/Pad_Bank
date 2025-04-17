const mongoose = require("mongoose")

const inventorySchema = new mongoose.Schema({
    inventoryType: {
        type: String,
        required: [true, "inventory type required"],
        enum: ["in", "out"]
    },
    sanitaryPad: {
        type: String,
        required: true, 
        enum: ['Sanitary Pads']
    },
    quantity: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Donor Email is required']
    },
    government: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: function () {
            return this.inventoryTpe === "in"
        }
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: function () {
            return this.inventoryTpe === "out"
        }
    },
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: function () {
            return this.inventoryTpe === "in"
        }
    }

}, { timestamps: true })

module.exports = mongoose.model("Inventory", inventorySchema)