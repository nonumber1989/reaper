var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Question = mongoose.model("Question");
var ObjectId = mongoose.Types.ObjectId;
var requestUtils = require('../services/requestUtils');
var responseUtils = require('../services/responseUtils');
var Promise = require("bluebird");
mongoose.Promise = Promise;

router.get('/:id', function(req, res, next) {
    var queryPromise = Question.findById(new ObjectId(req.params.id)).populate('survey').exec();
    queryPromise.then(function(question) {
        if (question) {
            res.json(question);
        } else {
            responseUtils.resourceNotFoundError(res, req.params.id);
        }
    }).catch(function(err) {
        responseUtils.internalError(res, err);
    });
});

router.post('/', function(req, res, next) {
    var theQuestion = new Question(req.body);
    theQuestion.save().then(function(question) {
        res.json(question);
    }).catch(function(err) {
        responseUtils.internalError(res, err);
    });

});

router.put('/:id', function(req, res, next) {
    var theQuestion = new Question(req.body);
    Question.findByIdAndUpdate(new ObjectId(req.params.id), {
        title: theQuestion.title
    }).exec().then(function(question) {
        if (question) {
            res.json(question);
        } else {
            responseUtils.resourceNotFoundError(res, req.params.id);
        }
    }).catch(function(err) {
        responseUtils.internalError(res, err);
    });

});

router.delete('/:id', function(req, res, next) {
    Question.findByIdAndRemove(new Object(req.params.id)).then(function() {
        responseUtils.deletedSuccessfully(res, req.params.id)
    }).catch(function(err) {
        responseUtils.internalError(res, err);
    })
});

module.exports = router;
