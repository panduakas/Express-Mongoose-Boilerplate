require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { users } = require('../src/models');
const bcrypt = require('bcrypt');

module.exports = passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        let userData = await users.findOne({
          where: {
            email: email,
          },
        });
        //username
        if (!userData) {
          return done(null, false, {
            message: 'Incorrect email or password!',
          });
        }
        //password
        const match = await bcrypt.compare(password, userData.password);
        if (!match) {
          return done(null, false, {
            message: 'Incorrect email or password!',
          });
        }
        return done(null, userData);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, cb) => {
      try {
        const userData = await users.findOne({
          where: {
            email: jwtPayload.email,
          },
        });

        return cb(null, userData);
      } catch (error) {
        return cb(error);
      }
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  users.findById(id, function(err, user) {
    done(err, user);
  });
});
