require('dotenv').config({ path: __dirname + '/.env' });
const AWS = require('aws-sdk');
const express = require('express');
const cors = require("cors");
const app = express();
const port = 3002;
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000", // Allow requests from frontend
    methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
    allowedHeaders: "Content-Type,Authorization"
}));

AWS.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
});

app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/business-units', require('./routes/businessUnitRoutes'));
app.use('/api/upload-resume',  require('./routes/resumeRoutes'));


/*const dynamodb = new AWS.DynamoDB.DocumentClient();


app.get('/getAllEmployees', async (req, res) => {
    const params = {
        TableName: 'employees'
    };

    try {
        const data = await dynamodb.scan(params).promise();
        res.json(data.Items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not retrieve items'.err });
    }
});


app.put('/editEmployee/:id', async (req, res) => {
    const employeeId = req.params.id;
    const updates = req.body;

    if (!updates || typeof updates !== 'object' || Array.isArray(updates) || Object.keys(updates).length === 0) {
        return res.status(400).json({ error: 'No update data provided.' });
    }

    let updateExp = 'set';
    const attrValues = {};
    const attrNames = {};
    console.log('updates', updates);
    const filteredUpdates = Object.keys(updates).reduce((obj, key) => {
        if (key !== 'id') obj[key] = updates[key];
        return obj;
    }, {});

    console.log('filteredUpdates', filteredUpdates);
    Object.keys(filteredUpdates).forEach((key) => {
        updateExp += ` #${key} = :${key},`;
        attrValues[`:${key}`] = filteredUpdates[key];
        attrNames[`#${key}`] = key;
    });
    updateExp = updateExp.slice(0, -1);

    const params = {
        TableName: 'employees',
        Key: { id: employeeId },
        UpdateExpression: updateExp,
        ExpressionAttributeValues: attrValues,
        ExpressionAttributeNames: attrNames,
        ReturnValues: "ALL_NEW"
    };

    try {
        const result = await dynamodb.update(params).promise();
        res.json(result.Attributes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not update employee', details: err.message });
    }
});

app.get('/employee/:id', async (req, res) => {
    const employeeId = req.params.id;

    const params = {
        TableName: 'employees',
        Key: { id: employeeId }
    };
    console.log('employeeId', employeeId);
    try {
        const result = await dynamodb.get(params).promise();
        if (!result.Item) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(result.Item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not retrieve employee', details: err.message });
    }
});*/




const PORT = process.env.PORT || port;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
