const express = require("express")
const { registerController, loginController, currentUserController } = require("../controllers/auth-controller")
const authMiddleware = require("../middlewares/auth-middleware")




const router = express.Router()

router.post('/register', registerController)
router.post('/login', loginController)
router.get('/current-user', authMiddleware, currentUserController)
module.exports = router