
const School = require('../models/School');
const PadApplication = require('../models/PadApplication');

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
const getApplicationHistory = async (req, res) => {
    try {
        const school = await School.findOne({ user: req.user._id });
        if (!school) {
            return res.status(404).json({ message: 'School not found' });
        }

        const history = await PadApplication.find({ school: school._id })
            .sort({ createdAt: -1 });

        res.json(history);
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

// ✅ Enhanced: Get School Profile + PadApplication Info
const getSchoolProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        // Get the school profile with user info
        const school = await School.findOne({ user: userId }).populate('user', 'name email');

        if (!school) {
            return res.status(404).json({ message: 'School not found' });
        }

        // Get the most recent pad application
        const application = await PadApplication.findOne({ school: school._id })
            .sort({ createdAt: -1 });

        // Build the full profile
        const profile = {
            schoolName: school.schoolName,
            county: school.county,
            femaleStudentCount: school.femaleStudentCount,
            uploadedDocs: school.uploadedDocs,
            user: school.user, // name + email
            numberOfGirls: application?.numberOfGirls || 0,
            status: application?.status || 'not applied',
            allocatedPads: application?.allocatedPads || 0
        };

        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    registerSchool,
    getSchoolProfile,
    uploadDocuments,
    getApplicationHistory 
};
