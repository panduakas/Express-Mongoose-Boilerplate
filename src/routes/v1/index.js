const express = require('express');
const users = require('./users');

// Declare API Route and API Version
const v1 = express.Router();

v1.use('/users', users);

module.exports = v1;
