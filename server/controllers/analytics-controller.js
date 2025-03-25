const InventoryModel = require("../model/Inventory.model")
const mongoose = require('mongoose')

const bloodGroupDetailsController = async (req, res) => {
    try {
        const bloodGroups = ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-']
        const organisation = new mongoose.Types.ObjectId(req.user.userId)
        const bloodGroupData = []
        // const organisation = req.user.userId

        await Promise.all(bloodGroups.map(async (bloodGroup) => {
            const totalIn = await InventoryModel.aggregate([
                {
                    $match: {
                        bloodGroup: bloodGroup,
                        inventoryType: 'in',
                        organisation
                    }
                }
                ,
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$quantity' }

                    }
                }
            ])

            const totalOut = await InventoryModel.aggregate([
                {
                    $match: {
                        bloodGroup: bloodGroup,
                        inventoryType: 'out',
                        organisation
                    }
                }
                ,
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$quantity' }

                    }
                }
            ])
            const availableBlood = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0)

            bloodGroupData.push({
                bloodGroup,
                totalIn: totalIn[0]?.total || 0,
                totalOut: totalOut[0]?.total || 0,
                availableBlood,

            })

        }))

        return res.status(200).json({
            success: true,
            message: "Blood Records fetched Successfully",
            bloodGroupData
        })
    }
    catch (error) {
        console.error("records Not Found", error)
        return res.status(500).json({
            success: false,
            message: "records Not Found",
            error
        })
    }
}

module.exports = { bloodGroupDetailsController }