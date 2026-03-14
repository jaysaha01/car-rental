const express = require('express')
const router = express.Router()
const authController = require("../controllers/auth.controllers")
const authMiddlware = require("../middleware/auth.middleware")

router.post('/createaccount', authController.createAccount)
router.post('/loginaccount', authController.loginAccount)
router.post('/updateaccount', authMiddlware, authController.updateAccount)
router.get('/profile', authMiddlware, authController.myProfile)

module.exports = router