const app = require('./app.js');
const config = require('config');
const server = app.listen(config.port);
const winston = require('../config/winston');

process.on('unhandledRejection', (reason, p) =>
  winston.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  winston.log(
    'info',
    'Server started on http://%s:%d',
    config.host,
    config.port
  )
);
