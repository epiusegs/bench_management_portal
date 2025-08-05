const express = require('express');
const router = express.Router();
const businessUnitController = require('../controllers/businessUnitController');

router.get('/', businessUnitController.getAllBusinessUnits);
router.get('/:id', businessUnitController.getBusinessUnitById);
router.put('/:id', businessUnitController.updateBusinessUnit);
router.get('/:id/employees', businessUnitController.getBusinessUnitEmployees);


module.exports = router;
