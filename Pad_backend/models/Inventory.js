const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    totalStock: {
        type: Number,
        required: true,
        default: 0
    },
    padsReceived: [
        {
            quantity: Number,
            source: String, // e.g., NGO name
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    padsAllocated: [
        {
            school: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'School'
            },
            quantity: Number,
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    padsDisbursed: [
        {
            school: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'School'
            },
            quantity: Number,
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Inventory', inventorySchema);
