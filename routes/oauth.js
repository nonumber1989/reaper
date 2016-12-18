var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var User = mongoose.model("User");
var ObjectId = mongoose.Types.ObjectId;
var requestUtils = require('../services/requestUtils');
var responseUtils = require('../services/responseUtils');
var configuration = require('../configurations/configuration');


// var cert = fs.readFileSync('./server/TLS/ryans-key.pem'); // secretOrPrivateKey

var generateToken = function(payload, secretOrPrivateKey) {
    var token;
    if (secretOrPrivateKey) {
        token = jwt.sign(payload, secretOrPrivateKey, {
            algorithm: configuration.jwt.jwtAlgorithm,
            expiresIn: configuration.jwt.expiresIn
        });
    } else {
        token = jwt.sign(payload, configuration.jwt.tokenSecret, {
            algorithm: configuration.jwt.jwtAlgorithm,
            expiresIn: configuration.jwt.expiresIn
        });
    }
    return token;
};

//generate refresh token 
router.post('/refreshToken', function(req, res, next) {
    var theUser = new User(req.body);

});

//revoke refresh token
router.delete('/refreshToken', function(req, res, next) {

});

//update refresh token
router.put('/refreshToken', function(req, res, next) {

});

//generate refresh token 
router.post('/accessToken', function(req, res, next) {
	var user = req.body;
	res.json(generateToken(user));
});

module.exports = router;
