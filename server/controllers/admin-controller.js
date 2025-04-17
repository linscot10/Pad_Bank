const User = require("../model/User.model")

const getDonorsListController = async (req, res) => {

    try {
        const donorData = await User
            .find({ role: 'donor' })
            .sort({ createdAt: -1 })
        return res.status(200).json({
            success: true,
            TotalCount: donorData.length,
            message: 'Donor List fetched successfully',
            donorData
        })
    } catch (error) {
        console.error("something Happened ", error)
        return res.status(500).json({
            success: false,
            message: "Error in getting Donor List",
            error
        })
    }
}
const getHospitalListController = async (req, res) => {

    try {
        const SchoolData = await User
            .find({ role: 'school' })
            .sort({ createdAt: -1 })
        return res.status(200).json({
            success: true,
            TotalCount: SchoolData.length,
            message: 'Schools List fetched successfully',
            SchoolData
        })
    } catch (error) {
        console.error("something Happened ", error)
        return res.status(500).json({
            success: false,
            message: "Error in getting School List",
            error
        })
    }
}
const getOrganisationListController = async (req, res) => {

    try {
        const governmentData = await User
            .find({ role: 'government' })
            .sort({ createdAt: -1 })
        return res.status(200).json({
            success: true,
            TotalCount: governmentData.length,
            message: 'government List fetched successfully',
            governmentData
        })
    } catch (error) {
        console.error("something Happened ", error)
        return res.status(500).json({
            success: false,
            message: "Error in getting government List",
            error
        })
    }
}

const deleteDonorController = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            success: true,
            message: 'Donor Record Deleted successfully',

        })
    } catch (error) {
        console.error("something Happened ", error)
        return res.status(500).json({
            success: false,
            message: "Error in deleting donor ",
            error
        })
    }
}
const deleteHospitalController = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            success: true,
            message: 'Hospital Record Deleted successfully',

        })
    } catch (error) {
        console.error("something Happened ", error)
        return res.status(500).json({
            success: false,
            message: "Error in deleting hospital record ",
            error
        })
    }
}
const deleteOrganisationController = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            success: true,
            message: 'School Record Deleted successfully',

        })
    } catch (error) {
        console.error("something Happened ", error)
        return res.status(500).json({
            success: false,
            message: "Error in deleting government record ",
            error
        })
    }
}

module.exports = { getDonorsListController, getHospitalListController, getOrganisationListController, deleteDonorController, deleteHospitalController, deleteOrganisationController }