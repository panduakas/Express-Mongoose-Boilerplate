require('dotenv').config();
const passport = require('passport');

let auth = (req, res, next) => {
  passport.authenticate(
    'jwt',
    {
      session: false,
    },
    (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json({
          message: info.message,
        });
      }

      req.user = user;
      next();
    }
  )(req, res, next);
};

module.exports = {
  auth,
};
