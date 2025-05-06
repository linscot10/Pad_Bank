const Sponsor = require('../models/Sponsor');
const Donation = require('../models/Donation');

const createSponsorProfile = async (req, res) => {
    try {
        const { organizationName, contactNumber, address } = req.body;

        const existing = await Sponsor.findOne({ user: req.user._id });
        if (existing) {
            return res.status(400).json({ message: 'Sponsor profile already exists' });
        }

        const sponsor = new Sponsor({
            user: req.user._id,
            organizationName,
            contactNumber,
            address
        });

        await sponsor.save();
        res.status(201).json(sponsor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const donatePads = async (req, res) => {
    try {
        const sponsor = await Sponsor.findOne({ user: req.user._id });

        if (!sponsor) {
            return res.status(404).json({ message: 'Sponsor profile not found' });
        }

        const { quantity, note } = req.body;

        const donation = new Donation({
            sponsor: sponsor._id,
            quantity,
            note
        });

        await donation.save();
        res.status(201).json({ message: 'Donation submitted', donation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getMyDonations = async (req, res) => {
    try {
        const sponsor = await Sponsor.findOne({ user: req.user._id });

        if (!sponsor) {
            return res.status(404).json({ message: 'Sponsor profile not found' });
        }

        const donations = await Donation.find({ sponsor: sponsor._id }).sort({ donatedAt: -1 });
        res.json(donations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createSponsorProfile,
    donatePads,
    getMyDonations
};
