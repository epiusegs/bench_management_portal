const Employee = require('../models/employeeModel');

exports.getAllEmployees = async (req, res) => {
    try {
        const items = await Employee.getAll();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Could not retrieve items', details: err.message });
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const item = await Employee.getById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Employee not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: 'Could not retrieve employee', details: err.message });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const updated = await Employee.updateById(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Could not update employee', details: err.message });
    }
};

exports.saveResume = async (req, res) => {
    const employeeId = req.params.id;
    const { resume } = req.body;
    if (!resume) return res.status(400).json({ error: 'No resume provided' });

    try {
        const updated = await Employee.saveResume(employeeId, resume);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Could not save resume', details: err.message });
    }
};
