var jwt = require('jwt-simple');
var validateUser = require('./auth.js').validateUser;
var configuration = require('../configuration.js');

module.exports = function (req, res, next) {
    // When performing a cross domain request, you will recieve
    // a preflighted request first. This is to check if our the app
    // is safe.

    // We skip the token outh for [OPTIONS] requests.
    //if(req.method == 'OPTIONS') next();
    var validateRegExp = new RegExp('\/(' + configuration.backend.paths.join('|') + ')');
    if (req.url.match(validateRegExp)) {
        next();
    } else {

        var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token']||req.headers['authorization'];
        var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
        if (token || key) {
            try {
                var decoded = jwt.decode(token, configuration.tokenSecret);

                if (decoded.exp <= Date.now()) {
                    res.status(400);
                    res.json({
                        "status": 400,
                        "message": "Token Expired"
                    });
                    return;
                }

                // Authorize the user to see if s/he can access our resources

                var dbUser = validateUser(key); // The key would be the logged in user's username
                if (dbUser) {

                    if (dbUser.role == 'admin') {
                        next(); // To move to next middleware
                    } else {
                        res.status(403);
                        res.json({
                            "status": 403,
                            "message": "Not Authorized"
                        });
                        return;
                    }
                } else {
                    // No user with this name exists, respond back with a 401
                    res.status(401);
                    res.json({
                        "status": 401,
                        "message": "Invalid User"
                    });
                    return;
                }

            } catch (err) {
                res.status(500);
                res.json({
                    "status": 500,
                    "message": "Oops something went wrong",
                    "error": err
                });
            }
        } else {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid Token or Key"
            });
            return;
        }
    }


};
