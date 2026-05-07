const express = require('express')
const router = express.Router()
const adminController = require("../controllers/admin.controller")
const authMiddlware = require("../middleware/auth.middleware")
const roleCheck = require("../middleware/role.middleware")

router.put('/approve-vehicle/:vid/:status', authMiddlware, roleCheck('Admin'), adminController.vahicleApproval)
router.get('/all-users', authMiddlware, roleCheck('Admin'), adminController.allUsers)
router.post('/search-user/:user', authMiddlware, roleCheck('Admin'), adminController.searchUser)
router.delete('/delete-user/:userid', authMiddlware, roleCheck('Admin'), adminController.deleteUser)
router.get('/show-bookings', authMiddlware, roleCheck('Admin'), adminController.showAllBooks)
router.get('/admin/dashboard', authMiddlware, roleCheck('Admin'), adminController.adminDashboard)
router.get('/all-vehicles', adminController.allVehicles)
router.get('/all-home-vehicles', adminController.allhomeVehicles)
router.get('/all-admin-vehicles', adminController.alladminVehicles)

module.exports = router