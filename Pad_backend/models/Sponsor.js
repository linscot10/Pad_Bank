const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    organizationName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String
    },
    address: String
});

module.exports = mongoose.model('Sponsor', sponsorSchema);
