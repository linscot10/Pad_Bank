const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    sponsor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sponsor',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    note: {
        type: String
    },
    donatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Donation', donationSchema);
