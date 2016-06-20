var fs = require('fs');
var jwt = require('jsonwebtoken');

var configuration = require('../configuration');
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

exports.generateToken = generateToken;
