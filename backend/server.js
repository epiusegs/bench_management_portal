require('dotenv').config();
const AWS = require('aws-sdk');
const express = require('express');
const app = express();
const port = 3002;


AWS.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

app.get('/getAllConsultants', async (req, res) => {
    const params = {
        TableName: 'Consultants'
    };

    try {
        const data = await dynamodb.scan(params).promise();
        res.json(data.Items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not retrieve items'.err });
    }
});

const PORT = process.env.PORT || port;
app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
