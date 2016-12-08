var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var User = mongoose.model("User");
var ObjectId = mongoose.Types.ObjectId;
var requestUtils = require('../services/requestUtils');
var responseUtils = require('../services/responseUtils');


//generate refresh token 
router.post('/refreshToken', function(req, res, next) {
    var theUser = new User(req.body);
    theUser.save().then(function(user) {
        res.json(user);
    }).catch(function(err) {
        res.status(400);
        res.json(err);
    });
});

//generate refresh token 
router.post('/accessToken', function(req, res, next) {
    var theUser = new User(req.body);
    theUser.save().then(function(user) {
        res.json(user);
    }).catch(function(err) {
        res.status(400);
        res.json(err);
    });
});



module.exports = router;
