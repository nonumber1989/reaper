var fs = require('fs');
var jwt = require('jsonwebtoken');

var configuration = require('../configuration');
// var cert = fs.readFileSync('../TLS/ryans-key.pem'); // secretOrPrivateKey

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

var token = generateToken({
    "aud": "www.example.com",
    "sub": "jrocket@example.com",
    "GivenName": "Johnny",
    "Surname": "Rocket",
    "Email": "jrocket@example.com",
    "Role": [
        "Manager",
        "Project Administrator"
    ]
});
console.log(token);


jwt.verify(token, configuration.jwt.tokenSecret, function(err, decoded) {
    if (err) {
        console.log(JSON.stringify(err))
    }
    console.log(JSON.stringify(decoded));
});



exports.generateToken = generateToken;