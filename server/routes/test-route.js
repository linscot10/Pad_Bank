const express = require("express")
const { testRoute } = require("../controllers/test-controller")


const router = express.Router()

router.get("/test", testRoute)

module.exports = router