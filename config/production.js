require('dotenv').config();
module.exports = {
  host: process.env.SERVER_DOMAIN,
  port: process.env.SERVER_PORT,
};
