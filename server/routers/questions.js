var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Question = mongoose.model("Question");
var ObjectId = mongoose.Types.ObjectId;
var requestUtils = require('../services/requestUtils');

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
            res.json({
                status: 404,
                errorMessage: "no records found"
            });
        }
    }).catch(function(err) {
        res.status(500);
        res.json({
            status: 500,
            errorMessage: err
        });
    });
});

router.get('/:id', function(req, res, next) {
    var queryPromise = Question.findById(new ObjectId(req.params.id)).exec();
    queryPromise.then(function(question) {
        if (question) {
            res.json(question);
        } else {
            res.json({
                status: 404,
                errorMessage: "record " + req.params.id + " not found"
            });
        }
    }).catch(function(err) {
        res.status(500);
        res.json({
            status: 500,
            errorMessage: err
        });
    });
});
//create a new question
router.post('/', function(req, res, next) {
    var theQuestion = new Question(req.body);
    theQuestion.save().then(function(question) {
        res.json(question);
    }).catch(function(err) {
        res.status(500);
        res.json({
            status: 500,
            errorMessage: err
        });
    });

});

router.put('/:id', function(req, res, next) {
    var theQuestion = new Question(req.body);
    Question.findByIdAndUpdate(new ObjectId(req.params.id), {
        title: theQuestion.title
    }, function(err, question) {
        if (err) {
            res.status(500);
            res.json({
                status: 500,
                errorMessage: err
            });
        } else {
            if (question) {
                res.json(question);
            } else {
                res.json({
                    status: 404,
                    errorMessage: "record " + req.params.id + " not found"
                });
            }
        }
    })
});

router.delete('/:id', function(req, res, next) {
    Question.findByIdAndRemove(new Object(req.params.id)).then(function() {
        res.json({
            status: 200,
            data: "record " + req.params.id + " deleted successfully"
        })
    }).catch(function(err) {
        res.status(500);
        res.json({
            status: 500,
            errorMessage: err
        });
    })
});

module.exports = router;