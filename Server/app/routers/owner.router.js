const express = require('express')
const router = express.Router()
const ownerController = require("../controllers/owner.controller");
const authMiddlware = require("../middleware/auth.middleware");
const uploadStorage = require("../middleware/fileUpload");
const roleCheck = require("../middleware/role.middleware")

router.post('/add-vehicle', uploadStorage.array('file',6), authMiddlware,roleCheck('Owner'), ownerController.addVehicel)
router.post('/edit-vehicle/:vid', uploadStorage.array('file',6), authMiddlware, roleCheck('Owner'), ownerController.editVehicle)
router.delete('/delete-vehicle/:vid', authMiddlware, roleCheck('Owner'), ownerController.deleteVehicel)
router.get('/owner-vehicles', authMiddlware, roleCheck('Owner'), ownerController.ownerVehicel)
router.get('/show-vehicles', ownerController.showVehicels)
router.get('/show-vehicle/:vid', ownerController.showVehicelDtls)
router.get('/requested-vehicles', authMiddlware, roleCheck('Owner'), ownerController.showRequestedVehicels)
router.put('/accept-or-reject/:bid/:status', authMiddlware, roleCheck('Owner'), ownerController.acceptOrRejectVehicels)
router.get('/owner-dashboard', authMiddlware, roleCheck('Owner'), ownerController.ownerDashboard)
router.get('/view-my-vehicles/:bid', authMiddlware, roleCheck('Owner'), ownerController.viewVehicle)

module.exports = router

