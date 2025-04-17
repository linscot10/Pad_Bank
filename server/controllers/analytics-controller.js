const InventoryModel = require("../model/Inventory.model")
const mongoose = require('mongoose')

const bloodGroupDetailsController = async (req, res) => {
    try {
        const sanitaryPads = ['Sanitary Pads']
        const government = new mongoose.Types.ObjectId(req.user.userId)
        const sanitaryPadData = []
        // const organisation = req.user.userId

        await Promise.all(sanitaryPads.map(async (sanitaryPad) => {
            const totalIn = await InventoryModel.aggregate([
                {
                    $match: {
                        sanitaryPad: sanitaryPad,
                        inventoryType: 'in',
                        government
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
                        sanitaryPad: sanitaryPad,
                        inventoryType: 'out',
                        government
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
            const availablesanitaryPad = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0)

            sanitaryPadData.push({
                sanitaryPad,
                totalIn: totalIn[0]?.total || 0,
                totalOut: totalOut[0]?.total || 0,
                availablesanitaryPad,

            })

        }))

        return res.status(200).json({
            success: true,
            message: "Blood Records fetched Successfully",
            sanitaryPadData
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