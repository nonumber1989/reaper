'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var commonUtils = require('../services/commonUtils');


//setup the express server
var reaper = express();
var router = require('./router');
var SECRET = 'shhhhhhared-secret';
//reaper.use(commonUtils.unless(['/katana','/accounts/authenticate'], expressJwt({secret: SECRET,requestProperty: 'x-access-token'})));
reaper.use(function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Content-type,Accept,Accept-Version,X-Access-Token,Origin,X-Requested-With,Aureaperization,Api-Version');
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
//static server
//reaper.use('/katana',express.static(path.join(process.cwd(), 'katana/app')));
router.routers(reaper);
// reaper.use('/reaper', routes.reaper);
// reaper.use('/speakers', routes.speakers);
// reaper.use('/accounts', routes.accounts);

// catch 404 and forward to error handler
reaper.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.json({
    message: err.message,
    error: err
  });
});

// error handlers

// development error handler
// will print stacktrace
if (reaper.get('env') === 'development') {
  reaper.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
reaper.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = reaper;
