var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Question = mongoose.model("Question");
var ObjectId = mongoose.Types.ObjectId;
var requestUtils = require('../services/requestUtils');
var responseUtils = require('../services/responseUtils');
var Promise = require("bluebird");
mongoose.Promise = Promise;

//view questions by pagenation
router.get('/', function(req, res, next) {
    var pagenation = requestUtils.getPagenation(req);
    var queryPromise = Question.find({}, {}, pagenation).exec();
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
    var queryPromise = Question.findById(new ObjectId(req.params.id)).exec();
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
//create a new question
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
    }, function(err, question) {
        if (err) {
            responseUtils.internalError(res, err);
        } else {
            if (question) {
                res.json(question);
            } else {
                responseUtils.resourceNotFoundError(res, req.params.id);
            }
        }
    })
});

router.delete('/:id', function(req, res, next) {
    Question.findByIdAndRemove(new Object(req.params.id)).then(function() {
        responseUtils.deletedSuccessfully(res, req.params.id)
    }).catch(function(err) {
        responseUtils.internalError(res, err);
    })
});

module.exports = router;