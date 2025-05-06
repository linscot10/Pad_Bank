const mongoose = require('mongoose');

const padAllocationSchema = new mongoose.Schema({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['allocated', 'disbursed'],
    default: 'allocated'
  },
  dateAllocated: {
    type: Date,
    default: Date.now
  }
});

const PadAllocation = mongoose.model('PadAllocation', padAllocationSchema);
module.exports = PadAllocation;
