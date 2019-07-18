require('dotenv').config();
const { response } = require('../../helpers/v1');
const { users } = require('../../services/v1');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');

const login = (req, res, next) => {
  passport.authenticate(
    'local',
    {
      session: false,
    },
    async (err, user, info) => {
      try {
        if (err) {
          return res.status(400).next(err);
        }
        if (!user) {
          return res.status(400).json({
            message: info.message,
          });
        }
        const data = {
          email: user.email,
          created_at: new Date(),
        };
        const token = jwt.sign(data, process.env.JWT_SECRET, {
          expiresIn: 86400 * 7,
        });
        const included = {
          token: token,
        };
        const statusUpdate = await users.updateStatus(user.id, true);
        if (!statusUpdate) {
          throw new Error('Failed to update status login');
        } else {
          return res
            .ok()
            .json(response(true, 'User signed in', user, included));
        }
      } catch (error) {
        return res.status(400).json(response(false, error.message));
      }
    }
  )(req, res, next);
};

const register = async (req, res) => {
  try {
    req.checkBody({
      name: { notEmpty: true, errorMessage: 'name params is required' },
      email: {
        notEmpty: true,
        isEmail: true,
        trim: true,
        errorMessage: 'email params is required',
      },
      phone: { notEmpty: true, errorMessage: 'phone params is required' },
      password: { notEmpty: true, errorMessage: 'password params is required' },
      password2: {
        notEmpty: true,
        errorMessage: 'password2 params is required',
      },
    });

    const errors = req.validationErrors();
    if (errors) throw new Error(errors[errors.length - 1].msg);

    const { name, email, phone, password, password2 } = req.body;

    const checkUser = await users.findUser(email, phone);

    if (checkUser) throw new Error('Email or Phone already exist!');
    if (password !== password2)
      throw new Error('Password comfirmation does not match');

    const newPassword = await bcrypt.hash(password, 10);
    const userCreate = await users.createUser(name, email, phone, newPassword);

    if (!userCreate) {
      throw new Error('Failed to create new user!');
    } else {
      res.ok().json(response(true, 'Registration Success!', userCreate));
    }
  } catch (error) {
    return res.badRequest().json(response(false, error.message));
  }
};

module.exports = {
  login,
  register,
};
