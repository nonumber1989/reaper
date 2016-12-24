var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var bcrypt = require('bcrypt');
var saltRounds = 12;
var User = mongoose.model("User");
var ObjectId = mongoose.Types.ObjectId;
var requestUtils = require('../services/requestUtils');
var responseUtils = require('../services/responseUtils');

router.get('/', function(req, res, next) {
    var pagenation = requestUtils.getPagenation(req);
    var queryPromise = User.find({})
        .skip(pagenation.offset)
        .limit(pagenation.limit)
        .sort('-createdTime')
        .select('-password -refreshTokens -follows')
        .exec();

    queryPromise.then(function(users) {
        res.json(users);
    }).catch(function(err) {
        responseUtils.internalError(res, err);
    });
});

router.get('/:id', function(req, res, next) {
    var queryPromise = User.findOne({ userName: req.params.id }).exec();
    queryPromise.then(function(user) {
        if (user) {
            res.json(user);
        } else {
            responseUtils.resourceNotFoundError(res, req.params.id);
        }
    }).catch(function(err) {
        responseUtils.internalError(res, err);
    });
});

router.post('/', function(req, res, next) {
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

router.put('/:id', function(req, res, next) {
    var theUser = req.body;
    var updatePromise = User.findByIdAndUpdate(new ObjectId(req.params.id), theUser).exec();
    updatePromise.then(function(user) {
        if (user) {
            res.status(204).end();
        } else {
            responseUtils.resourceNotFoundError(res, req.params.id);
        }
    }).catch(function(err) {
        responseUtils.internalError(res, err);
    });

});

router.patch('/:id', function(req, res, next) {
    var theUser = new User(req.body);
    var updatePromise = User.findByIdAndUpdate(new ObjectId(req.params.id), theUser).exec();
    updatePromise.then(function(user) {
        if (user) {
            res.status(204).end();
        } else {
            responseUtils.resourceNotFoundError(res, req.params.id);
        }
    }).catch(function(err) {
        responseUtils.internalError(res, err);
    });

});

router.delete('/:id', function(req, res, next) {
    User.findByIdAndRemove(new Object(req.params.id)).then(function(user) {
        res.status(204).end();
    }).catch(function(err) {
        responseUtils.internalError(res, err);
    });
});

module.exports = router;
