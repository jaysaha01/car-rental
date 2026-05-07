const express = require('express')
const router = express.Router()
const renterController = require("../controllers/renter.controller")
const authMiddlware = require("../middleware/auth.middleware")
const roleCheck = require("../middleware/role.middleware")

router.post('/book-vehicle/:vid', authMiddlware, roleCheck('Renter'), renterController.bookVahicle)
router.put('/cancel-vehicle/:bid', authMiddlware, roleCheck('Renter'), renterController.cancelVahicle)
router.get('/view-renter-vehicle/', authMiddlware, roleCheck('Renter'), renterController.viewRenterBookingVehicle)
router.post('/payment-vehicle/:amt', authMiddlware, roleCheck('Renter'), renterController.paymentVehicle)
router.get('/renter-dashboard', authMiddlware, roleCheck('Renter'), renterController.renterDashboardData)

module.exports = router