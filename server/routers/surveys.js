var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Survey = mongoose.model("Survey");
var Question = mongoose.model("Question");
var ObjectId = mongoose.Types.ObjectId;
var requestUtils = require('../services/requestUtils');
var responseUtils = require('../services/responseUtils');
var surveyVerify = require('../services/surveyVerify');
var Promise = require("bluebird");
mongoose.Promise = Promise;

router.get('/', function(req, res, next) {
  var pagenation = requestUtils.getPagenation(req);
  var account = requestUtils.getAccount(req);
  var queryPromise = Survey.find({creator:account.name}, {}, pagenation).exec();
  queryPromise.then(function(surveys) {
    if (surveys) {
      res.json(surveys);
    } else {
      responseUtils.resourcesNotFoundError(res);
    }
  }).catch(function(err) {
    responseUtils.internalError(res, err);
  });
});

router.get('/:id/questions', function(req, res, next) {
  var pagenation = requestUtils.getPagenation(req);
  var account = requestUtils.getAccount(req);
  var queryPromise = Question.find({survey:req.params.id}, {}, pagenation).exec();
  queryPromise.then(function(questions) {
    if (questions) {
      res.json(questions);
    } else {
      responseUtils.resourcesNotFoundError(res);
    }
  }).catch(function(err) {
    responseUtils.internalError(res, err);
  });
});

router.get('/:id', function(req, res, next) {
  var queryPromise = Survey.findById(new ObjectId(req.params.id)).exec();
  queryPromise.then(function(survey) {
    if (survey) {
      res.json(survey);
    } else {
      responseUtils.resourceNotFoundError(res, req.params.id);
    }
  }).catch(function(err) {
    responseUtils.internalError(res, err);
  });
});

router.post('/', function(req, res, next) {
  var account = requestUtils.getAccount(req);
  var theSurvey = new Survey(req.body);
  theSurvey.creator = account.name;
  theSurvey.save().then(function(survey) {
    res.json(survey);
  }).catch(function(err) {
    responseUtils.internalError(res, err);
  });

});

router.post('/:id/verify', function(req, res, next) {
  var pagenation = requestUtils.getPagenation(req);
  var account = requestUtils.getAccount(req);
  var queryPromise = Question.find({survey:req.params.id}, {}, pagenation).exec();
  queryPromise.then(function(questions) {
      res.json(surveyVerify.verifySurvery(req.body,questions));
  }).catch(function(err) {
    responseUtils.internalError(res, err);
  });
});

router.put('/:id', function(req, res, next) {
  var theSurvey = new Survey(req.body);
  Survey.findByIdAndUpdate(new ObjectId(req.params.id), {
    title: theSurvey.title
  }).exec().then(function(survey) {
    if (survey) {
      res.json(survey);
    } else {
      responseUtils.resourceNotFoundError(res, req.params.id);
    }
  }).catch(function(err) {
    responseUtils.internalError(res, err);
  });

});

router.delete('/:id', function(req, res, next) {
  Survey.findByIdAndRemove(new Object(req.params.id)).then(function() {
    responseUtils.deletedSuccessfully(res, req.params.id)
  }).catch(function(err) {
    responseUtils.internalError(res, err);
  })
});

module.exports = router;
