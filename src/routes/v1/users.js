const express = require('express');
const usersControllers = require('../../controllers/users');

const route = express.Router();

/**
 * Import auth
 */

// const { auth } = require('../../helpers/v1/auth');

route.post('/login', usersControllers.login); // login end point
route.post('/register', usersControllers.register); // register end point

/**
 * Using auth example
 */

// route.get('/', auth, usersControllers.getAll);

module.exports = route;
