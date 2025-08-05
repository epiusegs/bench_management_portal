const BusinessUnit = require('../models/businessUnitModel');
const employeeModel = require('../models/employeeModel');


exports.getAllBusinessUnits = async (req, res) => {
    try {
        const items = await BusinessUnit.getAll();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Could not retrieve items', details: err.message });
    }
};

exports.getBusinessUnitById = async (req, res) => {
    try {
        const item = await BusinessUnit.getById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Business Unit not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: 'Could not retrieve business unit', details: err.message });
    }
};

exports.updateBusinessUnit = async (req, res) => {
    try {
        const updated = await BusinessUnit.updateById(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Could not update business', details: err.message });
    }
};

exports.getBusinessUnitEmployees = async (req, res) => {
    const businessUnitId = req.params.id;
    try {
        const employees = await employeeModel.getByBusinessUnitId(businessUnitId);
        res.json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch employees for business unit" });
    }
};
