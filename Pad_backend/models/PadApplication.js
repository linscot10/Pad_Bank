const mongoose = require('mongoose');

const padApplicationSchema = new mongoose.Schema({
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true,
        unique: true
    },
    numberOfGirls: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['applied', 'allocated', 'disbursed'],
        default: 'applied'
    },
    allocatedPads: {
        type: Number,
        default: 0,
        required: true
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('PadApplication', padApplicationSchema);
