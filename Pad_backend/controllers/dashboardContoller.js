const Inventory = require('../models/Inventory');
const User = require('../models/User');
const PadApplication = require('../models/PadApplication');

exports.getDashboardStats = async (req, res) => {
    try {
        const inventory = await Inventory.findOne();
        const totalSchools = await User.countDocuments({ role: 'school' });
        const totalSponsors = await User.countDocuments({ role: 'sponsor' });
        const pendingRequests = await PadApplication.countDocuments({ status: 'applied' });

        res.json({
            totalReceived: inventory?.padsReceived || 0,
            totalAllocated: inventory?.padsAllocated || 0,
            totalDisbursed: inventory?.padsDisbursed || 0,
            totalSchools,
            totalSponsors,
            pendingRequests
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

