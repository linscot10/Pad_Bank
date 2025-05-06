const mongoose = require('mongoose');

const padRequestSchema = new mongoose.Schema({
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['applied', 'allocated', 'disbursed'],
        default: 'applied'
    },
    dateRequested: {
        type: Date,
        default: Date.now
    }
});

const PadRequest = mongoose.model('PadRequest', padRequestSchema);
module.exports = PadRequest;
