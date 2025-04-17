const InventoryModel = require("../model/Inventory.model");
const Inventory = require("../model/Inventory.model");
const UserModel = require("../model/User.model");
const User = require("../model/User.model")
const mongoose = require('mongoose');


const createInventoryController = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            throw new Error("User Not Found");

        }

        // if (inventoryType === "in" && user.role !== 'donor') {
        //     throw new Error("Not A donor Account")
        // }
        // if (inventoryType === "out" && user.role !== 'hospital') {
        //     throw new Error("Not A hospital Account")
        // }

        if (req.body.inventoryType == 'out') {
            const requestedsanitaryPad = req.body.sanitaryPad;
            const requestedQuantityOfsanitaryPad = req.body.quantity;
            const government = new mongoose.Types.ObjectId(req.user.userId)

            const totalInOfRequestedsanitaryPad = await InventoryModel.aggregate([
                {
                    $match: {
                        government,
                        inventoryType: 'in',
                        sanitaryPad: requestedsanitaryPad
                    }
                }, {
                    $group: {
                        _id: '$sanitaryPad',
                        total: { $sum: '$quantity' }
                    }
                }
            ]);
            console.log("Total In", totalInOfRequestedsanitaryPad)



            const totalIn = totalInOfRequestedsanitaryPad[0]?.total || 0
            // calculate blood out

            const totalOutOfRequestedsanitaryPad = await InventoryModel.aggregate([
                {
                    $match: {
                        government,
                        inventoryType: 'out',
                        sanitaryPad: requestedsanitaryPad
                    }
                }, {
                    $group: {
                        _id: '$sanitaryPad',
                        total: { $sum: '$quantity' }
                    }
                }
            ])

            const totalOut = totalOutOfRequestedsanitaryPad[0]?.total || 0

            const availableQuantityOfsanitaryPad = totalIn - totalOut


            if (availableQuantityOfsanitaryPad < requestedQuantityOfsanitaryPad) {
                return res.status(500).json({
                    success: false,
                    message: `Only ${availableQuantityOfsanitaryPad}ML of ${requestedsanitaryPad.toUpperCase()} is available`
                })
            }
            req.body.school = user?._id;
        }
        else {
            req.body.donor = user?._id
        }


        const inventory = new Inventory(req.body)
        await inventory.save()

        return res.status(201).json({
            success: true,
            message: "New sanitaryPad Record Added",
            data: inventory
        })
    } catch (error) {
        console.error('Something Happened', error)

        return res.status(500).json({
            success: false,
            message: "Something happened ,user not found",
            error
        })
    }
}

const getInventoryController = async (req, res) => {
    // console.log("req.body.userId:", req.user.userId);
    try {
        if (!mongoose.Types.ObjectId.isValid(req.user.userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid userId format"
            });
        }
        const inventory = await Inventory.find({ government: req.user.userId })
            .populate('donor')
            .populate('school')
            .sort({ createdAt: -1 })
        return res.status(200).json({
            success: true,
            message: "get all records successfully",
            inventory
        })

    } catch (error) {
        console.error('Error fetching the inventory', error)

        return res.status(500).json({
            success: false,
            message: "Error fetching the inventory",
            error
        })
    }
}


const getRecentInventoryController = async (req, res) => {
    try {

        const inventory = await InventoryModel.find({
            government: req.user.userId
        }).limit(3).sort({ createdAt: -1 })
        // console.log(inventory)
        return res.status(200).json({
            success: true,
            message: "recent inventory data",
            inventory
        })



    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error getting recent records",
            error
        })
    }
}

const getDonors = async (req, res) => {
    try {
        const government = req.user.userId
        const donorId = await InventoryModel.distinct("donor", {
            government
        })

        // console.log(donorId);
        const donors = await UserModel.find({ _id: { $in: donorId } })

        return res.status(200).json({
            success: true,
            message: "Donor Records Fetched Successfully",
            donors
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error getting donor records",
            error
        })
    }
}

const getHospitalController = async (req, res) => {
    try {
        const government = req.user.userId
        const schoolId = await InventoryModel.distinct("school", {
            government
        })

        // console.log(donorId);
        const schools = await UserModel.find({ _id: { $in: schoolId } })
        // console.log(hospitals);
        return res.status(200).json({
            success: true,
            message: "School Records Fetched Successfully",
            schools
        })



    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error getting school records",
            error
        })
    }
}


const getOrganisationController = async (req, res) => {
    try {
        const donor = req.user.userId
        const orgId = await InventoryModel.distinct("government", {
            donor
        })

        const governments = await UserModel.find({ _id: { $in: orgId } })

        return res.status(200).json({
            success: true,
            message: "government Records Fetched Successfully",
            governments
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error getting government records",
            error
        })
    }
}


const getOrganisationForHospitalController = async (req, res) => {
    try {
        const school = req.user.userId
        const orgId = await InventoryModel.distinct("government", {
            school
        })

        const governments = await UserModel.find({ _id: { $in: orgId } })

        return res.status(200).json({
            success: true,
            message: " school Organisation Records Fetched Successfully",
            governments
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error getting school Organisation records",
            error
        })
    }
}

// hospital records

const getInventoryHospitalController = async (req, res) => {
    // console.log("req.body.userId:", req.user.userId);
    try {
        if (!mongoose.Types.ObjectId.isValid(req.user.userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid userId format"
            });
        }



        // console.log("req.user.filters:", req.body.filters);

        const inventory = await Inventory.find(req.body.filters)
            .populate('donor')
            .populate('school')
            .populate('government')
            .sort({ createdAt: -1 })
        return res.status(200).json({
            success: true,
            message: "get  school consumer  records successfully",
            inventory
        })

    } catch (error) {
        console.error('Error fetching the inventory', error)

        return res.status(500).json({
            success: false,
            message: "Error fetching the  consumer inventory",
            error
        })
    }
}

module.exports = {
    createInventoryController,
    getInventoryController,
    getDonors,
    getHospitalController,
    getOrganisationController,
    getOrganisationForHospitalController,
    getInventoryHospitalController,
    getRecentInventoryController
}