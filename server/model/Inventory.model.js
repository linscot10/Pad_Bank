const mongoose = require("mongoose")

const inventorySchema = new mongoose.Schema({
    inventoryType: {
        type: String,
        required: [true, "inventory type required"],
        enum: ["in", "out"]
    },
    bloodGroup: {
        type: String,
        required: [true, "Blodd Group required"],
        enum: ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-']
    },
    quantity: {
        type: Number,
        required: [true, 'blood quantity is required']
    },
    email: {
        type: String,
        required: [true, 'Donor Email is required']
    },
    organisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'organisation is required']
    },
    hospital: {
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