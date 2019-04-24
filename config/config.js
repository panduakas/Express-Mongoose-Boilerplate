require('dotenv').config();
module.exports = {
  development: {
    username: process.env.DEV_USER,
    password: process.env.DEV_PASS,
    database: process.env.DEV_DATABASE,
    host: process.env.DEV_HOST,
    dialect: 'mysql',
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
      timezone: 'Asia/Jakarta', //for reading from database
    },
    timezone: 'Asia/Jakarta',
  },
  test: {
    username: process.env.TEST_USER,
    password: process.env.TEST_PASS,
    database: process.env.TEST_DATABASE || 'database_test',
    host: process.env.TEST_HOST,
    dialect: 'mysql',
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
      timezone: 'Asia/Jakarta', //for reading from database
    },
    timezone: 'Asia/Jakarta',
  },
  production: {
    username: process.env.PROD_USER,
    password: process.env.PROD_PASS,
    database: process.env.PROD_DATABASE,
    host: process.env.PROD_HOST,
    dialect: 'mysql',
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
      timezone: 'Asia/Jakarta', //for reading from database
    },
    timezone: 'Asia/Jakarta',
  },
};
