var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var configuration = require('./../configuration');
var responseUtils = require('./../services/responseUtils');
//setup the express server
var reaper = express();
var router = require('./router');
reaper.use(function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Content-type,Accept,Accept-Version,X-Access-Token,Origin,X-Requested-With,Authorization,Api-Version');
  next();
});

reaper.use(express.query());
// uncomment after placing your favicon in /public
//reaper.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
reaper.use(logger('dev'));
reaper.use(bodyParser.json());
reaper.use(bodyParser.urlencoded({
  extended: false
}));
reaper.use(cookieParser());
//for the jwt
//Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlN0ZXZlbi5YdSIsImVtYWlsIjoic3RldmVuLnh1QGdtYWlsLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5IiwiaWQiOjEyMywiaWF0IjoxNDY2NDMzNTk4LCJleHAiOjE0NjcwMzgzOTh9.NCvZRmGtCWBgPlCj2jGRaFwP6n_8y59eoy000d6VMmI
reaper.use(expressJwt({
  secret: configuration.jwt.tokenSecret,
  credentialsRequired: configuration.jwt.credentialsRequired
}).unless({
  path: ['/accounts/authenticate','/accounts/register']
}));

//static server
reaper.use('/reaper', express.static(path.join(process.cwd(), 'reaper/app')));
router.routers(reaper);
// reaper.use('/reaper', routes.reaper);

// catch 404 and forward to error handler
reaper.use(function(req, res, next) {
  responseUtils.notFoundError(res);
});
//handle reaper application exception
reaper.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    responseUtils.unauthorizedError(res, err);
  } else {
    responseUtils.internalError(res, err);
  }
});

// development error handler
if (reaper.get('env') === 'development') {
  reaper.use(function(err, req, res, next) {
    console.error(err);
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

module.exports = reaper;
