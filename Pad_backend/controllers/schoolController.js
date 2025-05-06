const School = require('../models/School');
const Padapplication = require('../models/PadApplication')

// Create or Update School Profile
const registerSchool = async (req, res) => {
    const { schoolName, county, femaleStudentCount, uploadedDocs } = req.body;

    try {
        const existing = await School.findOne({ user: req.user._id });

        if (existing) {
            existing.schoolName = schoolName;
            existing.county = county;
            existing.femaleStudentCount = femaleStudentCount;
            existing.uploadedDocs = uploadedDocs || [];
            await existing.save();
            return res.json({ message: 'School profile updated', school: existing });
        }

        const school = new School({
            user: req.user._id,
            schoolName,
            county,
            femaleStudentCount,
            uploadedDocs,
        });

        await school.save();
        res.status(201).json({ message: 'School registered', school });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Upload Student Document Paths

const uploadDocuments = async (req, res) => {
    try {
        const school = await School.findOne({ user: req.user._id });
        if (!school) return res.status(404).json({ message: 'School not found' });

        const filePaths = req.files.map(file => file.path);
        school.uploadedDocs.push(...filePaths);
        await school.save();

        res.json({ message: 'Documents uploaded', documents: school.uploadedDocs });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get School Profile
const getSchoolProfile = async (req, res) => {
    try {
        const school = await School.findOne({ user: req.user._id }).populate('user', 'name email');

        if (!school) {
            return res.status(404).json({ message: 'School not found' });
        }

        res.json(school);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { registerSchool, getSchoolProfile, uploadDocuments };
