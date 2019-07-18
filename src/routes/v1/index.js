const express = require('express');
const sample = require('./sample');

// Declare API Route and API Version
const v1 = express.Router();

v1.use('/sample', sample);

module.exports = v1;
