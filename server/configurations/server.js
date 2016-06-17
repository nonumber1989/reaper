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
var thor = express();
var router = require('./router');
var SECRET = 'shhhhhhared-secret';
//thor.use(commonUtils.unless(['/katana','/accounts/authenticate'], expressJwt({secret: SECRET,requestProperty: 'x-access-token'})));
thor.use(function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Content-type,Accept,Accept-Version,X-Access-Token,Origin,X-Requested-With,Authorization,Api-Version');
  next();
});

thor.use(express.query());
// uncomment after placing your favicon in /public
//thor.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
thor.use(logger('dev'));
thor.use(bodyParser.json());
thor.use(bodyParser.urlencoded({
  extended: false
}));
thor.use(cookieParser());
//static server
//thor.use('/katana',express.static(path.join(process.cwd(), 'katana/app')));
router.routers(thor);
// thor.use('/thor', routes.thor);
// thor.use('/jsonschema', routes.jsonschema);
// thor.use('/speakers', routes.speakers);
// thor.use('/accounts', routes.accounts);
// thor.use('/schedules', routes.schedules);
// thor.use('/gridfs', routes.gridfs);
// catch 404 and forward to error handler
thor.use(function(req, res, next) {
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
if (thor.get('env') === 'development') {
  thor.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
thor.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = thor;
