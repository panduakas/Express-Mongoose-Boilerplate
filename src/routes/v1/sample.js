const { wrap } = require('Helpers/v1');
const { sample } = require('Controllers/v1');

module.exports = (router) => {
  router.post('/', wrap(sample));
};
