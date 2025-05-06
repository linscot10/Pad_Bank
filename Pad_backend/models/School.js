const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    schoolName: {
        type: String,
        required: true,
    },
    county: {
        type: String,
        required: true,
    },
    femaleStudentCount: {
        type: Number,
        required: true,
    },
    uploadedDocs: {
        type: [String],
        default: [],
    },
    applied: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

module.exports = mongoose.model('School', schoolSchema);
