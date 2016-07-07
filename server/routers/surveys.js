var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Survey = mongoose.model("Survey");
var Register = mongoose.model("Register");
var ObjectId = mongoose.Types.ObjectId;
var requestUtils = require('../services/requestUtils');
var responseUtils = require('../services/responseUtils');
var surveyVerify = require('../services/surveyVerify');
var Promise = require("bluebird");
mongoose.Promise = Promise;


router.post('/register', function(req, res, next) {
  var theRegister = new Register(req.body);
  theRegister.save().then(function(register) {
    res.json(register);
  }).catch(function(err) {
    responseUtils.internalError(res, err);
  });
});

router.post('/survey', function(req, res, next) {
  var theSurvey = new Survey(req.body);
  theSurvey.save().then(function(survey) {
    res.json(survey);
  }).catch(function(err) {
    responseUtils.internalError(res, err);
  });
});

module.exports = router;
