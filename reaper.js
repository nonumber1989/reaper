var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var configuration = require('./configurations/configuration');
//for mongodb connection
require('./configurations/mongoose');

var users = require('./routes/users');
var oauth = require('./routes/oauth');
var follows = require('./routes/follows');

var reaper = express();

reaper.use(function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Content-type,Accept,Accept-Version,X-Access-Token,Origin,X-Requested-With,Authorization,Api-Version');
    next();
});

// uncomment after placing your favicon in /public
//reaper.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
reaper.use(logger('dev'));
reaper.use(bodyParser.json());
reaper.use(bodyParser.urlencoded({ extended: false }));
reaper.use(cookieParser());

reaper.use(bodyParser.json({limit: '20mb'}));
reaper.use(bodyParser.urlencoded({
  limit: '20mb',extended: false
}));

// reaper.use(express.static(path.join(__dirname, 'public')));
reaper.use(expressJwt({
    secret: configuration.jwt.tokenSecret,
    credentialsRequired: configuration.jwt.credentialsRequired,
    requestProperty: 'authentication'
}).unless({
    path: ['/oauth/authenticate', '/oauth/register']
}));

reaper.use('/users', users);
reaper.use('/oauth', oauth);
reaper.use('/follows', follows);

// catch 404 and forward to error handler
reaper.use(function(req, res, next) {
    var err = new Error('Resource Not Found !');
    err.status = 404;
    // next(err);
    res.json({
        message: err.message
    });
});

// error handler
reaper.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message
    });
});

module.exports = reaper;
