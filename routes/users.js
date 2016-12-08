var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var User = mongoose.model("User");
var ObjectId = mongoose.Types.ObjectId;
var requestUtils = require('../services/requestUtils');
var responseUtils = require('../services/responseUtils');

router.get('/', function(req, res, next) {
  var pagenation = requestUtils.getPagenation(req);
  var queryPromise = User.find({}, {}, pagenation).exec();
  queryPromise.then(function(users) {
    if (users) {
      res.json(users);
    } else {
      responseUtils.resourcesNotFoundError(res);
    }
  }).catch(function(err) {
    responseUtils.internalError(res, err);
  });
});

//get the user by id
router.get('/:id', function(req, res, next) {
  var queryPromise = User.findById(new ObjectId(req.params.id)).exec();
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
//create an user
router.post('/', function(req, res, next) {
  var theUser = new User(req.body);
  theUser.save().then(function(user) {
    res.json(user);
  }).catch(function(err) {
    res.status(400);
    res.json(err);
  });
});

// update the user by id
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

// update the user by id
router.patch('/:id', function(req, res, next) {
  var theUser = new User(req.body);
  var updatePromise = User.findByIdAndUpdate(new ObjectId(req.params.id), theUser).exec();
  updatePromise.then(function(user) {
    if (user) {
      res.json(user);
    } else {
      responseUtils.resourceNotFoundError(res, req.params.id);
    }
  }).catch(function(err) {
    responseUtils.internalError(res, err);
  });

});

//delete by id
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(new Object(req.params.id)).then(function(user) {
    responseUtils.deletedSuccessfully(res, req.params.id)
  }).catch(function(err) {
    responseUtils.internalError(res, err);
  });
});

module.exports = router;