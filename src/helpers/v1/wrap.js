module.exports = (fn) => (req, res, next) => {
  try {
    const result = fn(req, res, next);
    return result.catch(next);
  } catch (error) {
    return next(error);
  }
};
