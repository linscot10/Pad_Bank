const express = require("express")
const authMiddleware = require("../middlewares/auth-middleware")
const { bloodGroupDetailsController } = require("../controllers/analytics-controller")
const router = express.Router()


router.get('/bloodGroup-data', authMiddleware, bloodGroupDetailsController)



module.exports = router