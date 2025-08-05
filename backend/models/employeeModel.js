const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE = 'employees';

exports.getAll = async () => {
    const params = { TableName: TABLE };
    const data = await dynamodb.scan(params).promise();
    return data.Items;
};

exports.getById = async (id) => {
    const params = { TableName: TABLE, Key: { id } };
    const data = await dynamodb.get(params).promise();
    return data.Item;
};

exports.updateById = async (id, updates) => {
    // Build update expression (similar to your code)
    let updateExp = 'set';
    const attrValues = {};
    const attrNames = {};
    const filteredUpdates = Object.keys(updates).reduce((obj, key) => {
        if (key !== 'id') obj[key] = updates[key];
        return obj;
    }, {});

    Object.keys(filteredUpdates).forEach((key) => {
        updateExp += ` #${key} = :${key},`;
        attrValues[`:${key}`] = filteredUpdates[key];
        attrNames[`#${key}`] = key;
    });
    updateExp = updateExp.slice(0, -1);

    const params = {
        TableName: TABLE,
        Key: { id },
        UpdateExpression: updateExp,
        ExpressionAttributeValues: attrValues,
        ExpressionAttributeNames: attrNames,
        ReturnValues: "ALL_NEW"
    };
    const result = await dynamodb.update(params).promise();
    return result.Attributes;
};
/*exports.getByBusinessUnitId = async (businessUnitId) => {
    // If you have a GSI on businessUnitId
    const params = {
        TableName: "employees",
        IndexName: "businessUnitIdIndex",
        KeyConditionExpression: "businessUnitId = :b",
        ExpressionAttributeValues: { ":b": businessUnitId }
    };
    const data = await dynamodb.query(params).promise();
    return data.Items;
};*/

exports.getByBusinessUnitId = async (businessUnitId) => {
    const params = { TableName: "employees" };
    const data = await dynamodb.scan(params).promise();
    // Filter employees by businessUnitId (string comparison)
    return data.Items.filter(emp => emp.businessUnitId === businessUnitId);
};

exports.saveResume = async (id, resume) => {
    const params = {
        TableName: TABLE,
        Key: { id },
        UpdateExpression: "set #resume = :resume",
        ExpressionAttributeNames: { "#resume": "resume" },
        ExpressionAttributeValues: { ":resume": resume },
        ReturnValues: "ALL_NEW"
    };
    const result = await dynamodb.update(params).promise();
    return result.Attributes;
};

