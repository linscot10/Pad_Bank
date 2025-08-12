const School = require('../models/School');
const Sponsor = require('../models/Sponsor');
const Donation = require('../models/Donation');
const PadApplication = require('../models/PadApplication');
const PadAllocation = require('../models/PadAllocation');
const Inventory = require('../models/Inventory');
const mongoose = require('mongoose');


//  Get all pad applications
const getAllRequests = async (req, res) => {
    try {
        const applications = await PadApplication.find()
            .populate('school', 'schoolName contactPerson');
        // console.log(applications);

        res.json(applications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//  Get all donations
const getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.find()
            .populate('sponsor', 'organizationName');
        res.json(donations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//  Allocate pads to a school
const allocatePads = async (req, res) => {
    try {
        const { applicationId } = req.body;
        // const applicationId = req.params.id;

        // console.log("Received applicationId:", applicationId);



        const application = await PadApplication.findById({ _id: applicationId }).populate('school');
        console.log('Application found:', application);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });


        }

        let inventory = await Inventory.findOne();
        if (!inventory) return res.status(404).json({ message: 'Inventory not initialized' });

        if (inventory.totalStock < application.numberOfGirls)
            return res.status(400).json({ message: 'Not enough stock' });


        // Update Inventory
        inventory.totalStock -= application.numberOfGirls;
        inventory.padsAllocated.push({
            school: application.school._id,
            quantity: application.numberOfGirls,
            date: new Date()
        });
        await inventory.save();

        if (application.status !== 'applied') {
            return res.status(400).json({ message: 'Pads already allocated or disbursed' });
        }

        application.status = 'allocated';
        application.allocatedPads = application.numberOfGirls;;
        await application.save();

        const padAllocation = new PadAllocation({
            school: application.school._id,
            quantity: application.numberOfGirls, // Allocate the quantity based on number of girls
            status: 'allocated', // Status as allocated
            dateAllocated: new Date()
        });

        await padAllocation.save();

        // Return a success response with the allocated pads data
        res.status(200).json({ message: 'Pads successfully allocated', padAllocation });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const disbursePads = async (req, res) => {
    const { applicationId } = req.params;
    console.log(applicationId);



    try {


        // Find the PadApplication using the applicationId
        const application = await PadApplication.findById(applicationId).populate('school');
        console.log(application);

        if (!application) {
            return res.status(404).json({ message: 'Pad application not found' });
        }

        const school = application.school;
        if (!school) {
            return res.status(404).json({ message: 'School not found for this application' });
        }
        // Check if the pads have already been disbursed
        if (application.status === 'disbursed') {
            return res.status(400).json({ message: 'Pads already disbursed' });
        }

        // Check if the pads were already allocated (i.e., pads must be allocated before disbursement)
        if (application.status !== 'allocated') {
            return res.status(400).json({ message: 'Pads must be allocated before disbursement' });
        }

        // Ensure there are enough pads available in inventory (this assumes your inventory tracking logic is correct)
        let inventory = await Inventory.findOne();
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not initialized' });
        }

        if (inventory.totalStock < application.allocatedPads) {
            return res.status(400).json({ message: 'Not enough stock available for disbursement' });
        }

        // Proceed with disbursement: update application status and allocate pads
        application.status = 'disbursed';  // Mark the application as disbursed
        await application.save();

        // Create a new PadAllocation for disbursed pads
        const padAllocation = new PadAllocation({
            school: school._id,  // Use the school's ObjectId
            quantity: application.allocatedPads,  // The number of pads allocated is taken from the application
            status: 'disbursed',  // Update status to 'disbursed'
            dateAllocated: new Date()  // Record the current date/time of disbursement
        });

        // Save the PadAllocation for record
        await padAllocation.save();

        // Update inventory (reduce the stock)
        inventory.totalStock -= application.allocatedPads;
        inventory.padsDisbursed.push({
            school: school._id,
            quantity: application.allocatedPads,
            date: new Date()
        });
        await inventory.save();

        // Return a success response
        res.status(200).json({
            message: 'Pads successfully disbursed',
            padAllocation
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addPads = async (req, res) => {
    const { quantity, source } = req.body;

    try {
        let inventory = await Inventory.findOne();
        if (!inventory) {
            inventory = new Inventory({ totalStock: 0 });
        }

        inventory.totalStock += quantity;
        inventory.padsReceived.push({ quantity, source });
        await inventory.save();

        res.status(201).json({ message: 'Pads added to inventory', inventory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getInventory = async (req, res) => {
    try {
        const inventory = await Inventory.findOne()
            .populate('padsAllocated.school')
            .populate('padsDisbursed.school');

        res.json(inventory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//  Inventory summary
const getInventorySummary = async (req, res) => {


    try {
        // Get the total donated pads (pads received in the inventory)
        const inventory = await Inventory.findOne();

        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }

        // Total pads received (donations)
        const donated = inventory.padsReceived.reduce((total, pad) => total + pad.quantity, 0);

        // Total pads allocated (from padsAllocated field in the inventory)
        const allocated = inventory.padsAllocated.reduce((total, pad) => total + pad.quantity, 0);

        // Total pads disbursed (from padsDisbursed field in the inventory)
        const disbursed = inventory.padsDisbursed.reduce((total, pad) => total + pad.quantity, 0);

        // Calculate the stock available
        const stockAvailable = donated - disbursed;

        res.json({
            donated,
            allocated,
            disbursed,
            stockAvailable,
            getInventory
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllRequests,
    getAllDonations,
    allocatePads,
    getInventorySummary,
    addPads,
    disbursePads
};
