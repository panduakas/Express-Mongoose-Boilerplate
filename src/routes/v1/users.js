const express = require('express');
const { users } = require('../../controllers/v1');

const route = express.Router();

/**
 * Import auth
 */

// const { auth } = require('../../helpers/v1/auth');

route.post('/login', users.login); // login end point
route.post('/register', users.register); // register end point

/**
 * Using auth example
 */

// route.get('/', auth, users.getAll);

module.exports = route;
