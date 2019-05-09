require('module-alias/register');
require('../config/passport');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const passport = require('passport');
const uuid = require('node-uuid');
const pretty = require('pretty-response');
const winston = require('../config/winston');
const indexRouter = require('./routes/index');

const app = express();

const assignId = (req, res, next) => {
  req.id = uuid.v4();
  next();
};

morgan.token('id', req => req.id);

app.use(assignId);
app.use(passport.initialize());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(pretty);
app.use(
  morgan(
    ':id :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
    { stream: winston.stream }
  )
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
