const response = (status, message, data, included) => ({
  status,
  message,
  data,
  included,
});

module.exports = {
  response,
};
