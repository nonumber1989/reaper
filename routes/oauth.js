var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var saltRounds = 12;
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

router.post('/authenticate', function(req, res, next) {
    var theUser = req.body;
    var queryPromise = User.findOne({ userName: theUser.userName }).exec();
    queryPromise.then(function(user) {
        if (user) {
            var rawPassword = theUser.password;
            theUser = user;
            return bcrypt.compare(rawPassword, user.password);
        } else {
            responseUtils.resourceNotFoundError(res, req.params.id);
        }
    }).then(function(validated) {
        if (validated) {
            return theUser.update({ $set: { userName: 'hereisunique' } });
        } else {
            throw new Error('UserName or Password wrong!');
        }
    }).then(function(updatedUser) {
        console.log(theUser.toObject() + "-----");
        var userToken = {
            header: "Authorization",
            prefix: "Bearer",
            refreshToken: generateToken(theUser.toObject()),
            accessToken: crypto.randomBytes(256).toString('hex')
        };
        res.json(userToken);
    }).catch(function(err) {
        responseUtils.internalError(res, err);
    });

});

router.delete('/refreshToken', function(req, res, next) {

});

router.put('/refreshToken', function(req, res, next) {

});

router.post('/accessToken', function(req, res, next) {
    var user = req.body;
    res.json(generateToken(user));
});

router.post('/register', function(req, res, next) {
    var theUser = new User(req.body);
    bcrypt.hash(theUser.password, saltRounds).then(function(hashedPassword) {
        theUser.password = hashedPassword;
        return theUser.save();
    }).then(function(user) {
        user = user.toObject();
        delete user.password;
        res.json(user);
    }).catch(function(err) {
        res.status(400);
        res.json(err);
    });
});

module.exports = router;
