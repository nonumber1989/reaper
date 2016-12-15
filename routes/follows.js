var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Category = mongoose.model("Category");
var Channel = mongoose.model("Channel");
var Topic = mongoose.model("Topic");
var ObjectId = mongoose.Types.ObjectId;
var requestUtils = require('../services/requestUtils');
var responseUtils = require('../services/responseUtils');

router.post('/categories', function(req, res, next) {
    var theCategory = new Category(req.body);
    theCategory.save().then(function(category) {
        res.json(category);
    }).catch(function(err) {
        res.status(400);
        res.json(err);
    });
});

router.post('/channels', function(req, res, next) {
    var theChannel = new Channel(req.body);
    theChannel.save().then(function(channle) {
        res.json(channle);
    }).catch(function(err) {
        res.status(400);
        res.json(err);
    });
});

router.post('/topics', function(req, res, next) {
    var theTopic = new Topic(req.body);
    theTopic.save().then(function(topic) {
        res.json(topic);
    }).catch(function(err) {
        res.status(400);
        res.json(err);
    });
});



module.exports = router;
