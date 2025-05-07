const PadApplication = require('../models/PadApplication');
const School = require('../models/School');

const applyForPads = async (req, res) => {
    try {
        const school = await School.findOne({ user: req.user._id });
        // console.log("apply", school);


        if (!school) {
            return res.status(404).json({ message: 'School not found' });
        }

        const existing = await PadApplication.findOne({
            school: school._id,
            status: { $in: ['applied', 'allocated'] }
        });

        if (existing) {
            return res.status(400).json({ message: 'You already have an active application' });
        }

        const { quantityRequested, reason } = req.body;

        const application = new PadApplication({
            school: school._id,
            numberOfGirls: school.femaleStudentCount,
            quantityRequested,
            reason
        });

        school.applied = true;
        // console.log(school.applied);


        await school.save();
        await application.save();

        res.status(201).json({ message: 'Application submitted', application });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};







const getApplicationStatus = async (req, res) => {
    try {
        const school = await School.findOne({ user: req.user._id });
        // console.log("apply", school);
        if (!school) return res.status(404).json({ message: 'School not found' });

        const application = await PadApplication.findOne({ school: school._id });
        if (!application) {
            return res.json({
                status: 'Not Applied',
                quantityRequested: 0,
                allocatedPads: 0
            });
        }
        res.json(application);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    applyForPads,
    getApplicationStatus
};
